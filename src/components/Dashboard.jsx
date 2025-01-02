import React, { useEffect,useState,useRef} from "react";
import Home from "./Home";
import './Dashboard.css'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineDeleteSweep } from "react-icons/md";
import PieChart from "./PieChart";
import { ImDownload } from "react-icons/im";
import jsPDF from "jspdf";
import "jspdf-autotable";
function Dashboard(){
   
    const [incomeError,setIncomeError] = useState("")
    const [expenseError,setExpenseError] = useState("")
     const [username,setUsername] = useState("")
     const [availableBalance,setAvailableBalance] = useState(0)
     const [transaction,setTransactions] = useState([])
     const [income,setIncome] = useState(0)
     const [expense,setExpense] = useState(0)
     const [totalIncome,setTotalIncome] = useState(0)
     const [totalExpense,setTotalExpense] =useState(0)
     const [incomeCategory,setIncomeCategory] = useState("salary")
     const [expenseCategory,setExpenseCategory] = useState("groceries")
     const [expenseDate,setExpenseDate] = useState()
     const [incomeDate,setIncomeDate] = useState()
     const [search,setSearch] =useState()
     const[alltransaction,setAllTransaction] =useState([])

    useEffect(()=>{
        const savedUsername = localStorage.getItem("username")
        setUsername(savedUsername || "Guest")
    

    },[])


   const handleIncome=(e)=>{
    e.preventDefault();

    if (!income || income <= 0) {
        setIncomeError("Income must be greater than 0.");
        return;
      }
    
      setIncomeError("");

   const newTransaction ={
    id: new Date().getTime(),
    type:"Income",
    amount:parseFloat(income),
    category:incomeCategory,
    date : incomeDate || new Date().toLocaleDateString()
   }
      
   setTransactions([...transaction,newTransaction])
   setTotalIncome(totalIncome+parseFloat(income));
   setAvailableBalance(availableBalance+parseFloat(income))
    setIncome(0)
    setAllTransaction([...transaction,newTransaction])


   }

  const handleExpense=(e)=>{
    e.preventDefault();

    if(!expense || expense <=0){
        setExpenseError("Expense must be greater than 0")
        return
    }
    setExpenseError("")
   const newTransaction ={
    id: new Date().getTime(),
    type:"Expense",
    amount:parseFloat(expense),
    category:expenseCategory,
    date : expenseDate || new Date().toLocaleDateString()
   }
      
   setTransactions([...transaction,newTransaction])
   setTotalExpense(totalExpense+parseFloat(expense));
   setAvailableBalance(availableBalance-parseFloat(expense))
   setExpense(0)
   setAllTransaction([...transaction,newTransaction])



   }
  const calCulateTotalCategoryExpense=()=>{
    const categoryTotal = alltransaction
    .filter((tran)=>tran.type=="Expense")
    .reduce((acc,tran)=>{
        acc[tran.category]=(acc[tran.category]||0)+ tran.amount
        return acc
    },{})
    return categoryTotal;
  }

  const handleDeleteTransaction=(id)=>{
    const deleteTran =transaction
    .filter((trans)=>trans.id!= id)

    setTransactions(deleteTran)
    setAllTransaction(deleteTran)

    const deletedTransaction = transaction.find((trans)=>trans.id===id)
    if(deletedTransaction.type=="Income"){
        setTotalIncome(totalIncome-deletedTransaction.amount);
        setAvailableBalance(availableBalance-deletedTransaction.amount)
    }
    if(deletedTransaction.type=="Expense"){
        setTotalExpense(totalExpense- deletedTransaction.amount);
   setAvailableBalance(availableBalance+ deletedTransaction.amount)
    }
  }

  
  const handleSearch=(event)=>{
    const query =event.target.value.toLowerCase();

    setSearch(query);

    const searchTran = alltransaction.filter((trans)=>
    trans.type.toLowerCase().includes(query)||
    trans.date.includes(query)||
    trans.category.toLowerCase().includes(query)||
    trans.amount.toString().includes(query)
    )
    setTransactions(searchTran)
   
  }

  const downloadPdfWithJsPDF = () => {
    if (transaction.length === 0) {
      alert("No transactions to download!");
      return;
    }
  
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 10);
  
    const tableColumns = ["Date", "Type", "Category", "Amount"];
    const tableRows = transaction.map((tran) => [
      tran.date,
      tran.type,
      tran.category,
      tran.amount,
    ]);
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("Transaction_History.pdf");
  };

    return(  <>
       
        <div className="welcome">Welcome {username}!! 
            <div className="welcome-2">
          <div> Available Balance : <MdOutlineCurrencyRupee size={20}/>{availableBalance} </div> 
          <div>Total Income : <MdOutlineCurrencyRupee size={20}/>{totalIncome}</div>
          <div>Total Expenses : <MdOutlineCurrencyRupee size={20}/>{totalExpense}</div>
          </div>
        </div>
        <div className="Forms">
        <div className="InputForm">
            <form onSubmit={handleIncome}>
                <label>
                    Enter Your Income :
                    <input type="text" value={income} onChange={(e)=>setIncome(parseFloat(e.target.value)||0)} required>
                    </input>
                </label>
                <label>Category:
                    <select value={incomeCategory} onChange={(e)=>setIncomeCategory(e.target.value)} required>
                        <option value="salary">Salary</option>
                        <option value="side Income">Side Income</option>
                    </select>
                </label>
                <label>Date:
                    <input type="date" value={incomeDate} onChange={(e)=>setIncomeDate(e.target.value)} required></input>
                </label>
                {incomeError && <p className="error">{incomeError}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="ExpenseForm">
        <form onSubmit={handleExpense}>
                <label >
                    Enter Your Expense :
                    <input type="text" value={expense} onChange={(e)=>setExpense(e.target.value)} required>
                    </input>
                </label>
                <label>Category:
                    <select value={expenseCategory} onChange={(e)=>setExpenseCategory(e.target.value)} required>
                        <option value="Groceries">Groceries</option>
                        <option value="Rent">Rent</option>
                        <option value="Family">Family</option>
                        <option value="Study">Study</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>Date:
                    <input type="date" value={expenseDate} onChange={(e)=>(setExpenseDate(e.target.value))} required></input>
                </label>

                {expenseError && <p className="error">{expenseError}</p>}

                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
        
        <div className="top">
           <input placeholder="search" value={search} onChange={handleSearch}></input>
        
  <ImDownload size={25} onClick={downloadPdfWithJsPDF} /> 
        </div>



        <div className="transaction">
      <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
            
            transaction.length>0?
          
           ( 
                  transaction.map((tran,index)=>(

                <tr key={index}>
                    <td>{tran.date}</td>
                    <td>{tran.type}</td>
                    <td>{tran.category}</td>
                    <td><MdOutlineCurrencyRupee />{tran.amount}</td>
                    <td><MdOutlineDeleteSweep size={25} onClick={()=>handleDeleteTransaction(tran.id)}/></td>

                </tr>
            )

            )
           )
            :(
            <tr>
                <td  className="noTrans">
                <AiOutlineTransaction size={200} className="no-icon"/> 
                <p >  You have no transaction</p>
                </td>
            </tr>
           
        
        )
            }
         
        </tbody>
      </table>
      </div>


        
        <div className="Cht">
        <p className="Cht-txt">See Your Expenses Analytics</p>
  <PieChart expensesByCategory={calCulateTotalCategoryExpense()}></PieChart>
          </div>

       
    </>
    )
  
}

export default Dashboard