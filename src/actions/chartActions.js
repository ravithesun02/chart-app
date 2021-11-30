export const getInitialData=()=>async dispatch =>{
    try {
        dispatch({
            type:"AWATING_DATA"
        });

        const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json');
        let data = await response.json();

        let arr = [];

        data.forEach((item,index)=>{
            let d1 = {
                type: item.type,
                labels: Array.from(Array(item.elements.length).keys()),
                data : item.elements
            };

            arr.push(d1);
        })
        
        dispatch({
            type: "LOAD_API_DATA",
            payload: {
                data:arr
            }
        })
    }
    catch(e) {
        dispatch({
            type:"REJECTED_DATA"
        });
    }
}

export const updateValue =(itemIndex,arrayIndex,value)=> dispatch =>{
    dispatch({
        type:"AWATING_DATA"
    });
    dispatch({
        type: "UPDATE_VALUE",
        payload:{
            itemIndex,
            arrayIndex,
            value
        }
    })
}