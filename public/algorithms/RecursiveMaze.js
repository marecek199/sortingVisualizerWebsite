




let b_closed_list = []






const recursive_maze = async (beg_p) => {

    // grid_size = document.getElementsByClassName("grid-item").length ** 0.5
    console.log('Start of an Recursive Maze algorithm!')
    grid_size = document.getElementsByClassName("grid-item").length ** 0.5;
          
    // adding wall properties to all the grid points 
    for(let i=0; i < document.getElementsByClassName("grid-item").length; i++)
    {
        // except the start and end point
        if( i != beg_p.random_end && i !=  beg_p.random_start )
        {
            document.getElementsByClassName("grid-item")[i].classList.add('grid-item_wall')
        }
    }

    b_closed_list = []

    index_node = 0;

    let neighboors = [];
    //down
    if ( index_node+grid_size*2 < grid_size**2 )
    {        
        neighboors.push({index_grid: index_node+grid_size*2, parrent: index_node })
    }
    // right
    if ( (index_node+2)%grid_size != 0 )
    {
        neighboors.push({index_grid: index_node+2,parrent: index_node })
    }

    // deleting wall from 1st point
    // document.getElementsByClassName("grid-item")[index_node].classList.remove("grid-item_wall")

    // debugger;
    // random shuffle
    neighboors = neighboors.sort(() => Math.random() - 0.5)
    // adding to closed loop
    b_closed_list.push(index_node)
    // loop through the neighboors => recursive call
    for (let i=0; i<neighboors.length; i++)
    {
        back_rec(0,neighboors[i])
    }

    // END of algorithm
    // visualization the algorithm
    for (let i=0; i<b_closed_list.length; i++)
    {
        document.getElementsByClassName("grid-item")[b_closed_list[i]].classList.remove("grid-item_wall")
        await sleep(Math.round(visual_speed[1]/4))
    }

}






// recursive function
const back_rec = async (last_index,node) =>{

    // debugger;
    // await sleep(20)
    let index_node = node['index_grid']
    // clear the wall element between last and actual index
    // + the actual index node element
    let nmb_diff = index_node - last_index;
    // INDEX - LAST_INDEX 
    switch(nmb_diff)
    {
        // DOWN 
        case 2*grid_size:
            // document.getElementsByClassName("grid-item")[last_index+grid_size].classList.remove("grid-item_wall")
            // document.getElementsByClassName("grid-item")[last_index+2*grid_size].classList.remove("grid-item_wall")
            b_closed_list.push(last_index+grid_size)
            b_closed_list.push(last_index+2*grid_size)
            
            break
        // UP
        case -2*grid_size:
            // document.getElementsByClassName("grid-item")[last_index-grid_size].classList.remove("grid-item_wall")
            // document.getElementsByClassName("grid-item")[last_index-2*grid_size].classList.remove("grid-item_wall")
            b_closed_list.push(last_index-grid_size)
            b_closed_list.push(last_index-2*grid_size)
            break
        // RIGHT
        case 2:
            // document.getElementsByClassName("grid-item")[last_index+1].classList.remove("grid-item_wall")
            // document.getElementsByClassName("grid-item")[last_index+2].classList.remove("grid-item_wall")
            b_closed_list.push(last_index+1)
            b_closed_list.push(last_index+2)
            break
        // LEFT
        case -2:
            // document.getElementsByClassName("grid-item")[last_index-1].classList.remove("grid-item_wall")
            // document.getElementsByClassName("grid-item")[last_index-2].classList.remove("grid-item_wall")
            b_closed_list.push(last_index-1)
            b_closed_list.push(last_index-2)
            break
    }
    
    let neighboors = []
    // Making all the neighboors
    // carre about the max_left and max_right row and overgoing through the grid from one side to the another
    if ( (index_node-1)%grid_size != grid_size-1 && (index_node-2)%grid_size != grid_size-1 )
    {
        neighboors.push({index_grid: index_node-2,parrent: index_node })
    }
    if ( (index_node+1)%grid_size != 0 && (index_node+2)%grid_size != 0)
    {
        neighboors.push({index_grid: index_node+2,parrent: index_node })
    }
    //up
    if ( index_node-grid_size*2 >= 0  )
    {        
        neighboors.push({index_grid: index_node-grid_size*2, parrent: index_node })            
    }
    //down
    if ( index_node+grid_size*2 < grid_size**2 )
    {        
        neighboors.push({index_grid: index_node+grid_size*2, parrent: index_node })
    }

    
    // random shuffle neighboors
    neighboors = neighboors.sort(() => Math.random() - 0.5)

    // recursive call to neighboors, if not in closed list
    let found = false
    for (let i=0; i<neighboors.length; i++)
    {
        found = false
        for (let j=0; j<b_closed_list.length; j++)
        {
            if (b_closed_list[j] == neighboors[i]['index_grid'])
            {
                found = true
            }    
        }        
        // if element not already in closed list => recursive call
        if (!found)
        {
            back_rec(index_node,neighboors[i])
        }
        
    }





}







