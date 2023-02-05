import Pie3D from "@/components/PIe-Chart-3D"

const data = [{
    name: 'A',
    value: 15,
    color: 'red'
},
{
    name: 'B',
    value: 25,
    color: 'blue'
},
{
    name: 'C',
    value: 50,
    color: 'green'
},
{
    name: 'D',
    value: 35,
    color: 'yellow'
}]

const App = () => {
    return <Pie3D data={data} />
}

export default App