

const buble_sort = async (sort_vector) => {
    let temp, change = false;
    for (let i = 1; i < sort_vector.length; i++) {
        for (let j = 0; j < sort_vector.length - i; j++) {
            change = false;
            if (sort_vector[j] > sort_vector[j + 1]) {
                temp = sort_vector[j + 1];
                sort_vector[j + 1] = sort_vector[j];
                sort_vector[j] = temp;
                change = true;
            }

            await plus_visualize_sort_step(j, j + 1);
        }
    }
    unvisualize_sort_step();
    visualize_sort_step();
}


const selection_sort = async (sort_vector) => {
    let najm_idx, temp, change = false;
    for (let i = 0; i < sort_vector.length - 1; i++) {
        najm_idx = i;
        change = false;
        for (let j = i + 1; j < sort_vector.length; j++) {
            if (sort_vector[najm_idx] > sort_vector[j])
                najm_idx = j;
            change = true
        }
        if (change == true) {
            temp = sort_vector[najm_idx];
            sort_vector[najm_idx] = sort_vector[i];
            sort_vector[i] = temp;
            await plus_visualize_sort_step(i, najm_idx);
        }
    }
    unvisualize_sort_step();
    visualize_sort_step();
}


const insert_sort = async (sort_vector) => {
    let node, j;
    for (let i = 1; i < sort_vector.length; i++) {
        node = sort_vector[i];
        j = i - 1;
        while (j >= 0 && sort_vector[j] > node) {
            sort_vector[j + 1] = sort_vector[j];
            j -= 1;
            await plus_visualize_sort_step(j, j + 1);
        }
        sort_vector[j + 1] = node;
    }
    unvisualize_sort_step();
    visualize_sort_step();
}



const heap_sort = async (sort_vector) => {

    // making a heap from an array
    let i = sort_vector.length - 1, vec_len = sort_vector.length - 1;
    let temp, idx;

    for (i = sort_vector.length - 1; i >= 0; i--) {

        idx = i;
        let change = false, index = null;
        let son1, son2;
        // heap down -> parrent
        while ((idx) * 2 + 1 <= vec_len || (idx) * 2 + 2 <= vec_len && sort_vector[(idx)] > sort_vector[(idx) * 2 + 1] || sort_vector[(idx)] > sort_vector[(idx) * 2 + 2]) {
            change = false;
            if ((idx) * 2 + 1 <= vec_len && (idx) * 2 + 2 <= vec_len) {
                son1 = (idx) * 2 + 1;
                son2 = (idx) * 2 + 2;
                if (sort_vector[(idx)] > sort_vector[(idx) * 2 + 1] || sort_vector[(idx)] > sort_vector[(idx) * 2 + 2]) {
                    // choose the smaller one
                    if (sort_vector[(idx) * 2 + 1] <= sort_vector[(idx) * 2 + 2]) {
                        index = (idx) * 2 + 1;
                    } else {
                        index = (idx) * 2 + 2;
                    }
                    change = true;
                } else if (sort_vector[(idx)] > sort_vector[(idx) * 2 + 1]) {
                    index = (idx) * 2 + 1;
                    change = true;
                } else if (sort_vector[(idx)] > sort_vector[(idx) * 2 + 2]) {
                    index = (idx) * 2 + 2;
                    change = true;
                }
            } else if ((idx) * 2 + 1 <= vec_len) {
                index = (idx) * 2 + 1;
                change = true;
            } else if ((idx) * 2 + 2 <= vec_len) {
                index = (idx) * 2 + 2;
                change = true;
            }

            if (change == true) {
                // switching the numbers from heap
                temp = sort_vector[idx];
                sort_vector[idx] = sort_vector[index];
                sort_vector[index] = temp;
                await plus_visualize_sort_step(idx, index);
            } else
                break;
            idx = index;
        }
    }


    let vector = [];
    vector = sort_vector.slice();
    // unvisualize_sort_step();
    // visualize_sort_step();
    await sleep(2500);

    for (i = 0; i < sort_vector.length - 1; i++) {

        // if (i==49)
        //     debugger;        

        idx = 0;
        temp = sort_vector[idx];
        sort_vector[idx] = sort_vector[vec_len - i];
        sort_vector[vec_len - i] = temp;
        await plus_visualize_sort_step(idx, sort_vector.length - 1 - i);

        let change = false, index = null;
        let son1, son2;
        // heap down -> parrent
        while ((idx) * 2 + 1 < vec_len - i || (idx) * 2 + 2 < vec_len - i && sort_vector[(idx)] > sort_vector[(idx) * 2 + 1] || sort_vector[(idx)] > sort_vector[(idx) * 2 + 2]) {

            change = false;
            if ((idx) * 2 + 1 < vec_len - i && (idx) * 2 + 2 < vec_len - i) {
                son1 = (idx) * 2 + 1;
                son2 = (idx) * 2 + 2;
                if (sort_vector[(idx)] > sort_vector[(idx) * 2 + 1] || sort_vector[(idx)] > sort_vector[(idx) * 2 + 2]) {
                    // choose the smaller one
                    if (sort_vector[(idx) * 2 + 1] <= sort_vector[(idx) * 2 + 2]) {
                        index = (idx) * 2 + 1;
                    } else {
                        index = (idx) * 2 + 2;
                    }
                    change = true;
                } else if (sort_vector[(idx)] > sort_vector[(idx) * 2 + 1]) {
                    index = (idx) * 2 + 1;
                    change = true;
                } else if (sort_vector[(idx)] > sort_vector[(idx) * 2 + 2]) {
                    index = (idx) * 2 + 2;
                    change = true;
                }
            } else if ((idx) * 2 + 1 < vec_len - i) {
                index = (idx) * 2 + 1;
                change = true;
            } else if ((idx) * 2 + 2 < vec_len - i) {
                index = (idx) * 2 + 2;
                change = true;
            }

            if (change == true) {
                temp = sort_vector[idx];
                sort_vector[idx] = sort_vector[index];
                sort_vector[index] = temp;
                await plus_visualize_sort_step(idx, index);
            } else
                break;

            idx = index;
        }
        // debugger;    
    }
    // debugger;

    for (let i = 0; i < sort_vector.length / 2; i++) {
        temp = sort_vector[i];
        sort_vector[i] = sort_vector[sort_vector.length - 1 - i];
        sort_vector[sort_vector.length - 1 - i] = temp;
        await plus_visualize_sort_step(i, sort_vector.length - 1 - i);
    }
    // unvisualize_sort_step();
    // visualize_sort_step();
}


const merge_sort = async (sort_vector) => {
    // debugger;
    const n = sort_vector.length;
    let k = 1, i;
    let a, b, c;
    while (k < n) {
        i = 0;
        while (i + k < n) {
            a = i;
            b = i + k;
            c = Math.min(i + 2 * k, n);
            merge(i, i + k, Math.min(i + 2 * k, n), sort_vector);
            i += 2 * k;
            // unvisualize_sort_step();
            // visualize_sort_step();
            // await sleep(1);
        }
        k += k;
        unvisualize_sort_step();
        visualize_sort_step();
        await sleep(10);
    }
    unvisualize_sort_step();
    visualize_sort_step();
}

function merge(a, b, c, vector) {
    var vector_0 = [], vector_1 = [];

    for (var j = a; j < b; j++) {
        vector_0.push(vector[j]);
    }
    for (var j = b; j < c; j++) {
        vector_1.push(vector[j]);
    }
    // debugger;
    let i0 = 0, i1 = 0, i = a;
    let temp;
    while (i0 + i1 < c - a) {
        if (i0 < b - a && i1 < c - b) {

            if (vector_0[i0] <= vector_1[i1]) {
                vector[i] = vector_0[i0];
                i0++;
            } else {
                vector[i] = vector_1[i1];
                i1++;
            }

        } else {
            if (i0 == b - a) {
                vector[i] = vector_1[i1];
                i1++;
            }
            else if (i1 == c - b) {
                vector[i] = vector_0[i0];
                i0++;
            }
        }
        i++;
    }
}



// const quick_sort = async (sort_vector) => { }



const bucket_sort = async (sort_vector) => {
    // set a vector with values (from min to max) of sort vector
    bucket_vector = Array(sort_vector.length + 1).fill(0);

    for (let i = 0; i < sort_vector.length; i++) {
        bucket_vector[sort_vector[i]]++;
    }

    let idx_bucket = 0;
    let idx_vector = 0;
    let idx_search;
    // debugger;
    while (idx_bucket < bucket_vector.length) {

        while (bucket_vector[idx_bucket] > 0) {
            idx_search = idx_vector;
            while (sort_vector[idx_search] != idx_bucket)
                idx_search++;

            temp = sort_vector[idx_search];
            sort_vector[idx_search] = sort_vector[idx_vector];
            sort_vector[idx_vector] = temp;
            await plus_visualize_sort_step(idx_search, idx_vector)

            bucket_vector[idx_bucket]--;
            idx_vector++;

        }
        idx_bucket++;
    }

    // debugger;
}





