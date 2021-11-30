const initialState = {
    loading: true,
    // data:{
    //     labels:[],
    //     datasets: [{
    //         data:[],
    //         label:"DataSet",
    //         backgroundColor:['rgba(255, 99, 132, 0.2)',
    //                         'rgba(54, 162, 235, 0.2)',
    //                         'rgba(255, 206, 86, 0.2)',
    //                         'rgba(75, 192, 192, 0.2)',
    //                         'rgba(153, 102, 255, 0.2)',
    //                         'rgba(255, 159, 64, 0.2)',
    //                         ]
    //     }]
    // }
    data:[]

};

const chartReducer =(state = initialState, action)=>{
    const {type , payload} = action;

    switch(type) {
        case "AWATING_DATA":
            return {
                ...state,
                loading:true
            }
        case "REJECTED_DATA" :
            return {
                ...state,
                loading:false
            }
        case "LOAD_API_DATA":
            let arr = payload.data;
            let dataToSend = [];
            arr.forEach((item,index)=>{

                let d1 = {
                    type: item.type,
                    elements:item.data,
                    data:{
                        labels:item.labels,
                        datasets:[{
                            label:"Dataset",
                            data:item.data,
                            backgroundColor:['rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            ]
                        }]
                    }
                };

                dataToSend.push(d1);

            })
            return {
                ...state,
                loading:false,
                data:dataToSend
            };
        
        case "UPDATE_VALUE":
            console.log(state);
            let modifiyData = state.data[payload.itemIndex];
            let modifyElement = modifiyData.elements;
            modifyElement[payload.arrayIndex] = parseInt(payload.value);
            modifiyData.elements = modifyElement;
            modifiyData.data.datasets[0].data = modifyElement;

            let updatedData = state.data;
            updatedData[payload.itemIndex] = modifiyData;
            console.log(updatedData);
            return {
                ...state,
                loading:false,
                data:updatedData
            }

        default:
            return state;
    }
}

export default chartReducer;