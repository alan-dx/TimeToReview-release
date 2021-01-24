export default function averageCalculate(data) {
    let div = 0
    // console.log(data)
   data.map(item => {
        
        if (item != 0) {
            div++
        }
    })

    return (data.reduce((acumulator, currentValue) => acumulator + currentValue)/(div != 0 ? div : 1)).toFixed(2)
}