


const dijkstras_algo = async (beg_p) => {

    clear_path_f()

    algo_working ? algo_working=false :  algo_working=true

    grid_size = document.getElementsByClassName("grid-item").length ** 0.5
    console.log('Start of an Dijkstra\'s algorithm!')    
    
    row_end = beg_p.random_end % grid_size
    col_end = Math.floor(beg_p.random_end / grid_size)

    row_start = beg_p.random_start % grid_size
    col_start = Math.floor(beg_p.random_start / grid_size)

    let open_list = [{index_grid: beg_p.random_start, cost_function: 1000, parent: NaN}]
    let closed_list = []
    console.log(beg_p.random_end,beg_p.random_start)


    let min_val = NaN
    iter = 0
    while ( open_list.length > 0 && algo_working )
    {   


        // selecting the least cost_function -> and loop through 'em
        min_val = open_list[0]['cost_function']
        
        working_node_idx = open_list[0]['index_grid']
        
        // is the working node the final node ? if so -> end the algorithm ...
        if ( working_node_idx === beg_p.random_end)
        {
            // console.log(open_list)
            // console.log(working_node_idx)
            console.log("Found the route!")
            break   
        }

        // creating the neighboors
        neighboors = []
        var index_node = working_node_idx                       

        // carre about the max_left and max_right row and overgoing through the grid from one side to the another
        if ( (index_node-1)%grid_size != grid_size-1 )
        {
            neighboors.push({index_grid: index_node-1, cost_function: 1+open_list[0]['cost_function'], parrent: working_node_idx })
        }
        if ( (index_node+1)%grid_size != 0 )
        {
            neighboors.push({index_grid: index_node+1, cost_function: 1+open_list[0]['cost_function'], parrent: working_node_idx })
        }
        //up        
        neighboors.push({index_grid: index_node-grid_size,cost_function: 1+open_list[0]['cost_function'], parrent: working_node_idx })            
        //down        
        neighboors.push({index_grid: index_node+grid_size,cost_function: 1+open_list[0]['cost_function'], parrent: working_node_idx })

        // neighboors.push({index_grid: index_node-grid_size-1, cost_function: Math.abs((index_node-grid_size-1)%grid_size - row_end) + Math.abs((Math.floor((index_node-grid_size-1)/grid_size)) - col_end) , parrent: working_node_idx })
        // neighboors.push({index_grid: index_node-grid_size+1, cost_function: Math.abs((index_node-grid_size+1)%grid_size - row_end) + Math.abs((Math.floor((index_node-grid_size+1)/grid_size)) - col_end) , parrent: working_node_idx })
        // neighboors.push({index_grid: index_node+grid_size-1, cost_function: Math.abs((index_node+grid_size-1)%grid_size - row_end) + Math.abs((Math.floor((index_node+grid_size-1)/grid_size)) - col_end) , parrent: working_node_idx })
        // neighboors.push({index_grid: index_node+grid_size+1, cost_function: Math.abs((index_node+grid_size+1)%grid_size - row_end) + Math.abs((Math.floor((index_node+grid_size+1)/grid_size)) - col_end) , parrent: working_node_idx })
        


        let found = false
            // if the neighboors exist -> add to open list
        for (let i = 0; i<neighboors.length; i++)
        {      
            found = false
            // less than maximal value
            if ( neighboors[i]['index_grid'] < grid_size**2 && neighboors[i]['index_grid'] >= 0)
            {        
                try{
                    if ( !document.getElementsByClassName('grid-item')[ neighboors[i]['index_grid'] ].classList.contains('grid-item_wall') )
                    {                        
                        // not in closed_list
                        for(let j=0;j<closed_list.length;j++)
                        {
                            if ( neighboors[i]['index_grid'] === closed_list[j]['index_grid'] )
                            {
                                found = true
                                break
                            }
                        }
                        // check if already not in open list => or update
                        // console.log('On the kontrolieren way', )
                        for(let j=0;j<open_list.length;j++)
                        {
                            // console.log('Kontrolieren')
                            if ( neighboors[i]['index_grid'] == open_list[j]['index_grid'] )
                            {   
                                if ( neighboors[i]['traveled'] < open_list[j]['traveled'] )
                                {
                                    open_list[j] = neighboors[i]
                                }                             
                                found = true
                                break
                            }                    
                        }
                        // if not found in open/closed list => add to the open list
                        if ( found == false )
                        {
                            // console.log(found)
                            open_list.push(neighboors[i])
                        }
                    }
                    
                    } catch(TypeError){
                        console.log('error')
                        console.log(neighboors[i]['index_grid'])
                        console.log(i)
                        console.log(open_list[0])
                        console(document.getElementsByClassName('grid-item')[ neighboors[i]['index_grid'] ].classList.contains('grid-item_wall'))
                    }

            }
        }

            // remove the working node element from the open list and add to closed one
        let remove_node = open_list.shift()
        // console.log(remove_node['cost_function'],remove_node['traveled'], remove_node['h'])
        closed_list.push(remove_node)

            // sort the open_list array according the the cost_function 
            // bubble sort -> for sorting                        
        for (let i=0; i < open_list.length-1; i++)
        {
            for ( let j=1; j < open_list.length-i ; j++)
            {
                if ( open_list[j-1]['cost_function'] > open_list[j]['cost_function'] )
                {
                    
                    let holder = open_list[j]
                    open_list[j] = open_list[j-1]
                    open_list[j-1] = holder  
                    
                }                    
            }
        }

            // // color all the open_list points 
        for(let i=0; i<open_list.length; i++)
        {
            // console.log(document.getElementsByClassName("grid-item").length)
            if ( !document.getElementsByClassName('grid-item')[open_list[i]['index_grid']].classList.contains('grid-item_end') && !document.getElementsByClassName('grid-item')[open_list[i]['index_grid']].classList.contains('grid-item_start') )
            {
                // if ( !document.getElementsByClassName('grid-item')[open_list[i]['index_grid']].classList.contains('grid-item_start') )
                // {
                    document.getElementsByClassName('grid-item')[open_list[i]['index_grid']].classList.add('alg_open_list')
                // }                
            }
        }

        // color all the closed_list points
        for(let i=0; i<closed_list.length; i++)
        {
            //closed list coloring
            // cislo = 
            // console.log( !document.getElementsByClassName('grid-item')[cislo].classList.contains('grid-item_start') )
            if ( !document.getElementsByClassName('grid-item')[closed_list[i]['index_grid']].classList.contains('grid-item_start') )
            {
                document.getElementsByClassName('grid-item')[closed_list[i]['index_grid']].classList.add('alg_closed_list')
            }
        }               
        await sleep(visual_speed[0])

    }

    let nwm = open_list.shift()
    backprop_arr = [nwm]    
    console.log(nwm)
    // backpropagation from the end node to the start
    // loop through the points till the start point shows up and add them to an array
    let parrent = backprop_arr[0]['parrent']
    console.log(parrent)
    let found_back = false
    let index_back = NaN
    while ( parrent != beg_p.random_start && algo_working)
    {
        iter++;
        // console.log('Backprop')
        found_back = false                
        for(let i=0; i<closed_list.length ;i++)
        {            
            if ( closed_list[i]['index_grid'] == parrent )
            {
                // console.log('smthg')
                index_back = i
                found_back = true
                break
            }
        }
        if (found_back)
        {
            // console.log('adding')
            backprop_arr.push( closed_list[index_back] )
            parrent = closed_list[index_back]['parrent'] 
        }
        if (iter > 5000)
            break
    }
    console.log('Close')    
    
    if ( algo_working)
    {
        // Backprop coloring 
        backprop_arr.reverse()
        for ( let i=0; i<backprop_arr.length; i++)
        {
            if ( !document.getElementsByClassName('grid-item')[backprop_arr[i]['index_grid']].classList.contains('grid-item_start') )
            {
                if ( !document.getElementsByClassName('grid-item')[backprop_arr[i]['index_grid']].classList.contains('grid-item_end') )
                {
                    document.getElementsByClassName('grid-item')[backprop_arr[i]['index_grid']].classList.add('alg_backprop')
                }
            }        
            await sleep(visual_speed[1])
        }
    }

    algo_working = false;
    
}


















