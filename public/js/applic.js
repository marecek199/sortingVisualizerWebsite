
// setting the visualization speed  
const visual_speed_choose = { SuperFast: [10, 25], Fast: [30, 75], Medium: [75, 150], Slow: [120, 240], SuperSlow: [250, 350] }
let visual_speed = visual_speed_choose.Fast;


// sleeping function declaration
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


// initialiser
if (document.getElementsByClassName("grid-item").length > 0) {
    let grid_size = document.getElementsByClassName("grid-item").length ** 0.5
    const beg_p = {
        random_start: Math.floor((Math.random() * (grid_size ** 2))),
        random_end: Math.floor((Math.random() * (grid_size ** 2)))
    };

    // initialize Start and End points
    let found_start = document.getElementsByClassName("grid-item")[beg_p.random_start];
    let found_end = document.getElementsByClassName("grid-item")[beg_p.random_end];

    let row_end = beg_p.random_end % grid_size
    let col_end = Math.floor(beg_p.random_end / grid_size)

    let row_start = beg_p.random_start % grid_size
    let col_start = Math.floor(beg_p.random_start / grid_size)


    // begin point click 
    found_start.classList.add("grid-item_start");

    // end point click 
    found_end.classList.add("grid-item_end");


    //adding CLICK properties to the grid buttons
    let node = document.getElementsByClassName("grid-item")
    for (let i = 0; i < document.getElementsByClassName("grid-item").length; i++) {
        // adding proporties => to know, what to do in any 'click' situation 
        node[i].addEventListener("click", function () {
            // set starting point
            if (beg_p.random_start == 0 && beg_p.random_end != 0) {
                node[i].classList.add("grid-item_start")
                beg_p.random_start = i
                node[i].addEventListener("click", clickStart_p)
                document.getElementsByClassName("legend_colors_item")[0].style.backgroundColor = "white"
            }
            // set ending point
            else if (beg_p.random_end == 0 && beg_p.random_start != 0) {
                node[i].classList.add("grid-item_end")
                beg_p.random_end = i
                node[i].addEventListener("click", clickEnd_p)
                document.getElementsByClassName("legend_colors_item")[1].style.backgroundColor = "white"
            }
            else if (i == beg_p.random_start) {
                document.getElementsByClassName("legend_colors_item")[0].style.backgroundColor = "aqua"
                document.getElementsByClassName("grid-item_start")[0].removeEventListener("click", clickStart_p)
                document.getElementsByClassName("grid-item_start")[0].classList.remove("grid-item_start")
                beg_p.random_start = 0
            }
            else if (i == beg_p.random_end) {
                document.getElementsByClassName("legend_colors_item")[1].style.backgroundColor = "aqua"
                document.getElementsByClassName("grid-item_end")[0].removeEventListener("click", clickEnd_p)
                document.getElementsByClassName("grid-item_end")[0].classList.remove("grid-item_end")
                beg_p.random_end = 0
            }
            // set wall points
            else {
                if (i != beg_p.random_end || i != beg_p.random_start) {
                    node[i].classList.toggle("grid-item_wall")
                }
            }
        })
    }

    // Function click for a green point
    function clickStart_p() {
        document.getElementsByClassName("legend_colors_item")[0].style.backgroundColor = "white"
        document.getElementsByClassName("grid-item_start")[0].removeEventListener("click", clickStart_p)
        document.getElementsByClassName("grid-item_start")[0].classList.remove("grid-item_start")
        beg_p.random_start = 0
    }


    // Function click for a red point
    function clickEnd_p() {
        document.getElementsByClassName("legend_colors_item")[1].style.backgroundColor = "white"
        document.getElementsByClassName("grid-item_end")[0].removeEventListener("click", clickEnd_p)
        document.getElementsByClassName("grid-item_end")[0].classList.remove("grid-item_end")
        beg_p.random_end = 0
    }


    let drag = false;
    // setting wall properties
    for (let i = 0; i < document.getElementsByClassName("grid-item").length; i++) {
        node[i].addEventListener('mouseup', function () { drag = false });
        node[i].addEventListener('mousedown', function () { drag = true });
        node[i].addEventListener("mouseenter", function () {
            // set wall point
            if (i != beg_p.random_end && i != beg_p.random_start && beg_p.random_end != 0 && beg_p.random_start != 0) {
                if (drag) {
                    node[i].classList.toggle("grid-item_wall")
                }
            }
        })
    }

    //setAlgorithms change
    let node_alg = document.getElementsByClassName("drop1")
    for (let i = 0; i < document.getElementsByClassName("drop1").length; i++) {
        node_alg[i].addEventListener('click', function () {
            // let change1 = node_alg[i].innerHTML
            // node_alg[i].innerHTML = document.getElementById("navbarDropdown").innerHTML
            // document.getElementById("navbarDropdown").innerHTML = change1

            let algoritmus_name = node_alg[i].innerHTML
            // let visual_name = document.getElementById("navbarDropdown").innerHTML
            switch (algoritmus_name) {
                case 'A star algorithm':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize A*'
                    break
                case 'Dijstraks algorithm':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Dijkstra\'s'
                    break
                case 'Breath-first search algorithm':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Breath-first'
                    break
                case 'Deep-first search algorithm':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Deep-first'
                    break
                case 'Greedy best first search':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Greedy'
                    break
                default:
                    console.log('Did not found the right algorithm change')
                    break
            }
        })
    }

    //set Speed change
    let node_speed = document.getElementsByClassName("drop2")
    for (let i = 0; i < document.getElementsByClassName("drop2").length; i++) {
        node_speed[i].addEventListener('click', function () {
            // let change1 = node_speed[i].innerHTML
            // node_speed[i].innerHTML = document.getElementById("navbarDropdown").innerHTML
            // document.getElementById("navbarDropdown").innerHTML = change1

            let speed_name = node_speed[i].innerHTML
            // let visual_name = document.getElementById("navbarDropdown").innerHTML
            switch (speed_name) {
                case 'Super Fast':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Super Fast"
                    visual_speed = visual_speed_choose.SuperFast
                    break
                case 'Fast':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Fast"
                    visual_speed = visual_speed_choose.Fast
                    break
                case 'Medium':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Medium"
                    visual_speed = visual_speed_choose.Medium
                    break
                case 'Slow':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Slow"
                    visual_speed = visual_speed_choose.Slow
                    break
                case 'Super Slow':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Super Slow"
                    visual_speed = visual_speed_choose.SuperSlow
                    break
                default:
                    console.log('Did not found the right Speed')
                    break
            }
        })
    }

    // //set Grid size
    // let node_speed = document.getElementsByClassName("drop3")
    // for( let i=0; i < document.getElementsByClassName("drop3").length; i++)
    // {
    //     node_speed[i].addEventListener('click', function () {
    //         // let change1 = node_speed[i].innerHTML
    //         // node_speed[i].innerHTML = document.getElementById("navbarDropdown").innerHTML
    //         // document.getElementById("navbarDropdown").innerHTML = change1

    //         let speed_name =  node_speed[i].innerHTML
    //         // let visual_name = document.getElementById("navbarDropdown").innerHTML
    //         switch (speed_name) 
    //         {
    //             case '50':

    //                 break
    //             case '120':
    //                 break
    //             default:
    //                 console.log('Did not found the grid size')
    //                 break
    //         }
    //     })
    // }



    //Starting button for algorithm visualisation
    pole_points = [{}];

    var algo_working = false
    document.getElementById("algorithmStart").addEventListener('click', function () {

        // flashing purple display as the start indication
        for (let i = 0; i < document.getElementsByClassName("grid-item").length; i++) {
            pole_points[i] = new Map()
            pole_points[i].set('visited', false)
            // if (document.getElementsByClassName("grid-item")[i].classList.contains("grid-item_end") || document.getElementsByClassName("grid-item")[i].classList.contains("grid-item_start") )
            // {
            //     pole_points[i].set('color', 'special');
            // } else {
            //     pole_points[i].set('color', 'purple');
            // }

            // if ( pole_points[i].get("color") == 'purple' )
            // {
            //     document.getElementsByClassName("grid-item")[i].classList.add("animation_one")
            //     setTimeout(function(){
            //         document.getElementsByClassName("grid-item")[i].classList.remove("animation_one")
            //     },100);    

            // }        
        }

        let algoritmus = document.getElementById("algorithmStart").innerHTML;
        switch (algoritmus) {
            case 'Visualize A*':
                a_star_algo(beg_p)
                break
            case 'Visualize Dijkstra\'s':
                dijkstras_algo(beg_p)
                break
            case 'Visualize Breath-first':
                breath_first(beg_p)
                break
            case 'Visualize Deep-first':
                deep_first(beg_p)
                break
            case 'Visualize Greedy':
                break
            case 'Select Algorithm':
                document.getElementById("algorithmStart").innerHTML = 'CHOOSE THE ALGORITHM!'
                break
            case 'Start the game':
                snake_game(beg_p)
                break
            default:
                console.log('Did not found the right algorithm')
                break
        }
    })


    // adding click properties to the Maze Generators
    let nodeMaze = document.getElementsByClassName("dropMaze")
    for (let i = 0; i < document.getElementsByClassName("dropMaze").length; i++) {
        nodeMaze[i].addEventListener("click", function () {
            let algo_name = nodeMaze[i].innerHTML
            switch (algo_name) {
                case 'Recursive Maze':
                    recursive_maze(beg_p)
                    break
                case 'Binarry Tree Maze':
                    bin_tree_maze(beg_p)
                    break
                default:
                    console.log('Did not found the right maze algorithm')
                    break
            }

        })
    }


    // clear the board button
    if (document.getElementsByClassName("clear_board").length > 0) {
        document.getElementsByClassName("clear_board")[0].addEventListener('click', clear_board_f)
        function clear_board_f() {
            clear_path_f()
            clear_wall_f()
        }
    }

    if (document.getElementsByClassName("clear_path").length > 0) {
        // clear the path button
        document.getElementsByClassName("clear_path")[0].addEventListener('click', clear_path_f)
        clear_path_f()
    }

    function clear_path_f() {
        // clear the open list
        // console.log('Open list',document.getElementsByClassName("alg_open_list").length)
        // console.log('Closed list',document.getElementsByClassName("alg_closed_list").length)
        // console.log('Path list',document.getElementsByClassName("alg_backprop").length)

        let dlzka_open = document.getElementsByClassName("alg_open_list").length
        for (; dlzka_open > 0; dlzka_open--) {
            document.getElementsByClassName("alg_open_list")[0].classList.remove("alg_open_list")
        }
        // // clear the close list 
        let dlzka_close = document.getElementsByClassName("alg_closed_list").length
        for (; dlzka_close > 0; dlzka_close--) {
            document.getElementsByClassName("alg_closed_list")[0].classList.remove("alg_closed_list")
        }

        // // clear the final path    
        let dlzka_path = document.getElementsByClassName("alg_backprop").length
        for (; dlzka_path > 0; dlzka_path--) {
            document.getElementsByClassName("alg_backprop")[0].classList.remove("alg_backprop")
        }
        open_list = []
        closed_list = []
    }

    // clear the wall button
    if (document.getElementsByClassName("clear_wall").length > 0) {
        document.getElementsByClassName("clear_wall")[0].addEventListener('click', clear_wall_f)
        function clear_wall_f() {
            let dlzka_wall = document.getElementsByClassName("grid-item_wall").length
            for (; dlzka_wall > 0; dlzka_wall--) {
                document.getElementsByClassName("grid-item_wall")[0].classList.remove("grid-item_wall")
            }
        }
    }

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
}


// ========================================================================================================================


else if (document.getElementsByClassName("grid-item_sort").length > 0) {

    let id;
    let name = document.getElementById('set_grid_size').innerHTML;
    if (name == 'Grid size: 10') {
        id = 10;
    } else if (name == 'Grid size: 20') {
        id = 20;
    } else if (name == 'Grid size: 50') {
        id = 50;
    } else if (name == 'Grid size: 75') {
        id = 75;
    } else if (name == 'Grid size: 100') {
        id = 100;
    }

    // //adding CLICK properties to the grid buttons
    // let node = document.getElementsByClassName("grid-item_sort")
    // for( let i=0; i < document.getElementsByClassName("grid-item_sort").length ; i++ )
    // {
    //     // adding proporties => to know, what to do in any 'click' situation 
    //     node[i].addEventListener("click", function ()
    //     {
    //         node[i].classList.toggle("grid-item_wall")                       
    //     })
    // }




    //set Speed change
    let node_speed = document.getElementsByClassName("drop2");
    for (let i = 0; i < document.getElementsByClassName("drop2").length; i++) {
        node_speed[i].addEventListener('click', function () {
            // let change1 = node_speed[i].innerHTML
            // node_speed[i].innerHTML = document.getElementById("navbarDropdown").innerHTML
            // document.getElementById("navbarDropdown").innerHTML = change1

            let speed_name = node_speed[i].innerHTML;
            // let visual_name = document.getElementById("navbarDropdown").innerHTML
            switch (speed_name) {
                case 'Super Fast':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Super Fast";
                    visual_speed = visual_speed_choose.SuperFast;
                    break;
                case 'Fast':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Fast";
                    visual_speed = visual_speed_choose.Fast;
                    break;
                case 'Medium':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Medium";
                    visual_speed = visual_speed_choose.Medium;
                    break;
                case 'Slow':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Slow";
                    visual_speed = visual_speed_choose.Slow;
                    break;
                case 'Super Slow':
                    document.getElementById("algor_speed").innerHTML = "Speed:" + " Super Slow";
                    visual_speed = visual_speed_choose.SuperSlow;
                    break
                default:
                    console.log('Did not found the right Speed');
                    break;
            }
        })
    }

    // initialize random vector 
    let sort_vector = [];
    for (let i = 1; i <= id; i++) {
        sort_vector.push(i);
    }
    // shuffle vector sort
    sort_vector.sort(() => Math.random() - 0.5);
    const col = id * 2;
    const row = id;
    visualize_sort_step();



    // Shuffle the board
    if (document.getElementsByClassName("shuff_vect").length > 0) {
        document.getElementsByClassName("shuff_vect")[0].addEventListener('click', shuffle_vector_f)
        function shuffle_vector_f() {
            sort_vector.sort(() => Math.random() - 0.5);
            unvisualize_sort_step();
            visualize_sort_step();
        }
    }


    function visualize_sort_step() {
        for (let i_col = 0; i_col < col; i_col += 2) {
            // find the right col
            find_idx_col = col * row - col + i_col; // 5000 - 100, -98, -96
            for (let idx_row = 0; idx_row < sort_vector[i_col / 2]; idx_row++) {
                find_idx = find_idx_col - idx_row * col; // 4900 -100, -200, -300,
                document.getElementsByClassName('grid-item_sort')[find_idx].classList.add('grid-item_pile');
            }
        }
    }


    function unvisualize_sort_step() {
        for (let i_col = 0; i_col < col; i_col += 2) {
            find_idx_col = col * row - col + i_col; // 5000 - 100, -98, -96
            for (let idx_row = 0; idx_row < row; idx_row++) {
                find_idx = find_idx_col - idx_row * col; // 4900 -100, -200, -300,
                document.getElementsByClassName('grid-item_sort')[find_idx].classList.remove('grid-item_pile');
            }
        }
    }





    var algo_working = false
    document.getElementById("algorithmStart").addEventListener('click', function () {
        let algoritmus = document.getElementById("algorithmStart").innerHTML;
        switch (algoritmus) {
            case 'Visualize Bubble sort':
                buble_sort(sort_vector);
                break
            // case 'Visualize Quicksort':
            //     break
            // case 'Visualize Surge sort':
            //     break
            case 'Visualize Merge sort':
                merge_sort(sort_vector);
                break
            case 'Visualize Selection sort':
                selection_sort(sort_vector);
                break
            case 'Visualize Insert sort':
                insert_sort(sort_vector);
                break
            case 'Visualize Heap sort':
                heap_sort(sort_vector);
                break
            case 'Visualize Bucket sort':
                bucket_sort(sort_vector);
                break
            case 'Visualize sorting':
                document.getElementById("algorithmStart").innerHTML = 'CHOOSE THE ALGORITHM !';
                break
            default:
                console.log('Did not found the right sorting algorithm')
                break
        }
    })


    let node_alg = document.getElementsByClassName("drop1")
    for (let i = 0; i < document.getElementsByClassName("drop1").length; i++) {
        node_alg[i].addEventListener('click', function () {
            // let change1 = node_alg[i].innerHTML
            // node_alg[i].innerHTML = document.getElementById("navbarDropdown").innerHTML
            // document.getElementById("navbarDropdown").innerHTML = change1

            let algoritmus_name = node_alg[i].innerHTML
            // let visual_name = document.getElementById("navbarDropdown").innerHTML
            switch (algoritmus_name) {
                case 'Bubble sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Bubble sort';
                    shuffle_vector_f()
                    break
                case 'Quick sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Quicksort';
                    shuffle_vector_f()
                    break
                case 'Surge sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Surge sort';
                    shuffle_vector_f()
                    break
                case 'Merge sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Merge sort';
                    shuffle_vector_f()
                    break
                case 'Selection sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Selection sort';
                    shuffle_vector_f()
                    break
                case 'Insert sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Insert sort';
                    shuffle_vector_f()
                    break
                case 'Heap sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Heap sort';
                    shuffle_vector_f()
                    break
                case 'Bucket sort':
                    document.getElementById("algorithmStart").innerHTML = 'Visualize Bucket sort';
                    shuffle_vector_f()
                    break
                default:
                    console.log('Did not found the right sort algorithm change')
                    break
            }
        })
    }


    plus_visualize_sort_step = async (index_col0, index_col1) => {
        let indx0 = [], indx1 = [];

        find_idx_col0 = col * row - col + index_col0 * 2; // 5000 - 100, -98, -96
        for (let idx_row = 0; idx_row < sort_vector[index_col1]; idx_row++) {
            find_idx0 = find_idx_col0 - idx_row * col;
            document.getElementsByClassName('grid-item_sort')[find_idx0].classList.remove('grid-item_pile');
            indx0.push(find_idx0);
        }
        find_idx_col1 = col * row - col + (index_col1) * 2;
        for (let idx_row = 0; idx_row < sort_vector[index_col0]; idx_row++) {
            find_idx1 = find_idx_col1 - idx_row * col;
            document.getElementsByClassName('grid-item_sort')[find_idx1].classList.remove('grid-item_pile');
            indx1.push(find_idx1);
        }

        await sleep(visual_speed[0]);


        find_idx_col0 = col * row - col + index_col0 * 2; // 5000 - 100, -98, -96
        for (let idx_row = 0; idx_row < sort_vector[index_col0]; idx_row++) {
            find_idx0 = find_idx_col0 - idx_row * col;
            document.getElementsByClassName('grid-item_sort')[find_idx0].classList.add('grid-item_pile');
            indx0.push(find_idx0);
        }
        find_idx_col1 = col * row - col + (index_col1) * 2;
        for (let idx_row = 0; idx_row < sort_vector[index_col1]; idx_row++) {
            find_idx1 = find_idx_col1 - idx_row * col;
            document.getElementsByClassName('grid-item_sort')[find_idx1].classList.add('grid-item_pile');
            indx1.push(find_idx1);
        }


    }


}












