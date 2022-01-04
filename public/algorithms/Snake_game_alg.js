

let Snake = {
    head: NaN,
    leng_s: 0, 
    tail_arr: []
}


const snake_game = async (beg_p) => {
    
    

    algo_working ? algo_working=false :  algo_working=true

    
    
    while (algo_working)
        {

        // calculating the route according to A* algorithm
        route_array = await a_star_algo(beg_p,true)
        route_array.push(beg_p.random_end)

        Snake.head = beg_p.random_start
        let food_found = false

        // if the route exists
        if (route_array.length > 0)
        {
            // while the head is not on the end point
            while (route_array.length > 0 && algo_working)
            {
                

                // save head to the array
                let save_tail = Snake.head

                // changing the Head coordinates
                // moving the head
                let prev_head = Snake.head
                Snake.head = route_array.shift()
                beg_p.random_start = Snake.head
                if(Snake.head == beg_p.random_end)
                {
                    
                    food_found = true                
                }                                

                // 
                Snake.tail_arr.unshift(save_tail)
                
                // coloring the head and tail itteration
                // add & remove head color                 
                document.getElementsByClassName('grid-item')[Snake.head].classList.remove('alg_backprop')
                document.getElementsByClassName('grid-item')[Snake.head].classList.add('grid-item_start')
                document.getElementsByClassName('grid-item')[prev_head].classList.remove('grid-item_start')
                
                
                // move the tail
                // add the first one if the length > 0
                if ( Snake.leng_s > 0 || food_found )
                    document.getElementsByClassName('grid-item')[Snake.tail_arr[0]].classList.add('snake_tail')
                // remove the last one <=> only if not found 
                
                if (!food_found )
                    document.getElementsByClassName('grid-item')[Snake.tail_arr.pop()].classList.remove('snake_tail')


                // console.log(Snake.head,beg_p.random_end)
                // if its the end point -> terminate
                if(food_found)
                    break
                
                
                await sleep(Math.round(visual_speed[1]))

            }

            if (algo_working)
            {
                if(food_found)
                {
                    // add +1 length point to tale
                    Snake.leng_s += 1

                    // randomize new end point
                    new_end = Math.floor((Math.random()*(grid_size**2) ))
                    while( document.getElementsByClassName('grid-item')[new_end].classList.contains('grid-item_wall') == true )
                    {
                        new_end = Math.floor((Math.random()*(grid_size**2) ))
                    }
                    
                    
                    //color the end and starting point
                    document.getElementsByClassName('grid-item')[beg_p.random_end].classList.remove('grid-item_end')
                    beg_p.random_end = new_end
                    document.getElementsByClassName('grid-item')[beg_p.random_end].classList.add('grid-item_end')
                    
                    beg_p.random_start = Snake.head;
                }
                else{
                    alert('Not able to found the route!')
                }
            }

        }

    }
    if (!algo_working)
        clear_path_f()

}

// snake_game(beg_p)






