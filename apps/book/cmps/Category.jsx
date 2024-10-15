

const { useEffect, useState } = React
import { Chart } from "./Chart.jsx"
//* tried import and feild why idk groupItemsByCategory
export function Category() {
    const [categories, setCategories] = useState([])


    const [itemsData,] = useState(CategoryBooks())

    function CategoryBooks() {
       return [
            { id: 1, title: "at viverra venenatis", category: "love" }, //* id doing nada
            { id: 2, title: "morbi", category: "computers" },
            { id: 3, title: "metus hendrerit", category: "computers" },
            { id: 4, title: "mi ante posuere", category: "fictin" },
            { id: 5, title: "sem himenaeos aptent", category: "fictin" },
            { id: 6, title: "consequat neque volutpat", category: "Religion" },
            { id: 7, title: "urna ornare gravida", category: "Religion" },
            { id: 8, title: "risus", category: "Religion" },
            { id: 9, title: "class", category: "Religion" },
            { id: 11, title: "donec mi ullamcorper", category: "fictin" },
            { id: 12, title: "quis", category: "computers" },
            { id: 13, title: "fgns", category: "love" }
        ]
    }

    useEffect(() => {
        //* is an array of unique categories for exsample love ... an arr
        const uniqueCategories = [...new Set(itemsData.map(item => item.category))]
        // console.log(uniqueCategories)

        setCategories(uniqueCategories)
    }, [itemsData])

   function groupItemsByCategory () {
        return categories.map(category => {
            //* filter them once
            const itemsInCategory = itemsData.filter(item => item.category === category)
            return {
                category,
                items: itemsInCategory, //* all the deteils for the category
                percentage: ((itemsInCategory.length / itemsData.length) * 100) //* to %
            }
        })
    }


    return (
        <section className="book-dashboard">
            <h1>category</h1>
            <Chart data={groupItemsByCategory().map(group => ({
                title: group.category,
                value: group.percentage
            }))} />

            <hr />
        </section>
    )
}