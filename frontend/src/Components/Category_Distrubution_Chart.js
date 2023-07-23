import {
    Chart as chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from "chart.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { Bar } from "react-chartjs-2"
import { startGetCategorySpends } from "../Redux/Actions/expensesAction"

chartjs.register(
    BarElement, LinearScale, CategoryScale, Tooltip, Legend
)

const CategoryDistChart = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetCategorySpends())
    },[])

    const { categories, expenses } = props

    let categoriesName = []

        categories.forEach(ele => {
            categoriesName.push(ele.title)
        })
   
 

    const findAmount = useMemo(()=>{
        let amountUsed = []
        categories.forEach((category)=>{
            let amount = 0
            expenses.forEach(ele => {
                if (ele.categoryId === category._id) {
                    amount += ele.amount
                }
            })
            amountUsed.push(amount)
        })
        return amountUsed
    },[categories, expenses])


    const data = {
        labels: [...categoriesName],
        datasets: [
            {
                label: "Amount Used",
                data: [...findAmount],
                backgroundColor: "aqua",
                borderColor: "black",
                borderWidth: 1
            }
        ]
    }

    const options = {}


    return (
        <div>
            <h1 className="badge bg-primary text-wrap fs-6">CATEGORYWISE DISTRUBUTION</h1>
            <Bar
                data={data}
                options={options}
            />
        </div>
    )
}


export default CategoryDistChart