

const bin_tree_maze = async (beg_p) => {

    // bin treee

    grid_size = document.getElementsByClassName("grid-item").length ** 0.5
    console.log('Start of an Bin Tree Maze algorithm!')
        
    row_end = beg_p.random_end % grid_size
    col_end = Math.floor(beg_p.random_end / grid_size)

    row_start = beg_p.random_start % grid_size
    col_start = Math.floor(beg_p.random_start / grid_size)


    // adding wall properties to all the grid points 
    for(let i=0; i < document.getElementsByClassName("grid-item").length; i++)
    {
        // except the start and end point
        if( i != beg_p.random_end && i !=  beg_p.random_start )
        {
            document.getElementsByClassName("grid-item")[i].classList.add('grid-item_wall')
        }
    }
    
    // carve north / west 
    let node = document.getElementsByClassName("grid-item")
    let choose_side = null

    // always adding the first element
    for(let row=0; row < grid_size/2 ; row++)
    {
        for(let col=0; col < grid_size/2 ; col++)
        {
            i = row*grid_size*2 + col*2;
            
            choose_side = Math.round(Math.random())
            // Start / End point ? 
            if (i==beg_p.random_start || i==beg_p.random_start ){
                continue
            }

            // open the working node 
            node[i].classList.remove('grid-item_wall')

            // if [0] go UP <=> if [1] go LEFT
            if (choose_side == 0)
            {
                // check UP available
                if( i-grid_size > 0){                
                    node[i-grid_size].classList.remove('grid-item_wall')
                } 
                else if ((i-1)%grid_size != grid_size-1 && i > 0 ) {
                    node[i-1].classList.remove('grid-item_wall')
                }
            }
            else if ( choose_side == 1 ) {
                // check Left available
                if ((i-1)%grid_size != grid_size-1 && i > 0 )
                {
                    node[i-1].classList.remove('grid-item_wall')
                }
                else if (i-grid_size > 0){
                    node[i-grid_size].classList.remove('grid-item_wall')
                }
            }        
            
            // await sleep(100)
            await sleep(Math.round(visual_speed[0]/5))

        }
    }

    let a = 0;
    
}
