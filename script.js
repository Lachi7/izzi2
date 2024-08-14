let Services=document.querySelector(".services")
async function fetchJSONData() {
    let result = await fetch('./allProsData.json').then((res)=>res.json())
    display(result.data.taskers)
    let ascR = Array.from(result.data.taskers).sort((a, b) => a.averageRating - b.averageRating)
    let desR = Array.from(result.data.taskers).sort((a, b) => b.averageRating - a.averageRating)   
    
    let ascC = Array.from(result.data.taskers).sort((a, b) => a.completedTasks - b.completedTasks)
    let desC = Array.from(result.data.taskers).sort((a, b) => b.completedTasks - a.completedTasks)
   
    let selectRating = document.getElementById('ratings')
    selectRating.addEventListener('change', () => rating(selectRating.value, ascR, desR))

    let selectCount = document.getElementById('count')
    selectCount.addEventListener('change', () => count(selectCount.value, ascC, desC))

    const radio = document.querySelectorAll('input[name="pros"]');
        radio.forEach((radio) => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    pros(this.id,result.data.taskers)
                }
            });
        });
}

function rating(ratingValue, ascR, desR) {
    if (ratingValue === 'ascending') {
        display(ascR)
        console.log("The selected rating is: Ascending")
    }else {
        display(desR)
        console.log("The selected rating is: Descending")
    }
}

function count(countValue, ascC, desC) {
    if (countValue === 'ascending1') {
        display(ascC)
        console.log("The selected count is: Ascending")
    }else {
        display(desC)
        console.log("The selected count is: Descending")    
    }
}
function pros(id,arr){
    if (id ==='super'){
        let superv=arr.filter(tasker=>tasker.supervisor==true)
        display(superv)
    }else if (id ==='top'){
        let top=arr.filter(tasker=>tasker.eliteTasker==true && tasker.supervisor==false)
        display(top)
    }else if(id==='pro'){
        let proTasker=arr.filter(tasker=>tasker.supervisor==false)
        display(proTasker)
    }else if(id==='new'){
        function before(tasker){
            let currentDate = new Date();
            let sixMonthsAgo = new Date(currentDate);
            let startDate = new Date(tasker.startDate)
            sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
            return startDate>sixMonthsAgo && tasker.supervisor==false
        }
        let newTasker=arr.filter(before)
        display(newTasker)
    }
}
function newPro(tasker,pro){
    let startDate = new Date(tasker.startDate)
    let currentDate = new Date()
    let monthsPassed = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth())
    console.log(`Months passed: ${monthsPassed} ${tasker.user.name}`)
    if(monthsPassed<=6){
        let newpro=document.createElement("div")
        newpro.classList.add("new")
        newpro.innerHTML=`<img src="Shape.png" alt="">New Pro`
        pro.appendChild(newpro)
    }
}
function display(arr){
        let people=document.querySelector(".people")
        people.innerHTML = ``
        for(let i=0; i<arr.length; i++){
            let tasker = arr[i]
            let name = tasker.user.name
            let surname = tasker.user.surname
            let profilePic=tasker.user.profile_picture.publicUrl
            let person=document.createElement("div")
            person.classList.add("person")
            person.innerHTML=`
                            <div class="profile">
                                <img src="${profilePic}" alt="">
                                <div class="name">${name} ${surname}
                                    <div class="rating">
                                        <img src="Group 2704.png" alt="">
                                        <span>${tasker.averageRating}</span>
                                    </div>
                                </div>
                            </div>
                        `
            let pro=document.createElement("div")
            pro.classList.add("tasks-pro")
            
            if(tasker.supervisor){
                pro.innerHTML=`
                            <div class="tasks"><img src="Group 26286.png" alt="">${tasker.completedTasks} Tasks</div>
                                <div class="category"><img src="Hashtag.png" alt="">Supervisor</div>
                            
                            `
            }
            else if(tasker.eliteTasker){
                pro.innerHTML=`
                            <div class="tasks"><img src="Group 26286.png" alt="">${tasker.completedTasks} Tasks</div>
                                <div class="category"><img src="Hashtag.png" alt="">Top Pro</div>
                            
                           `
                           newPro(tasker,pro)
            }
            else{
                pro.innerHTML=`
                            <div class="tasks"><img src="Group 26286.png" alt="">${tasker.completedTasks} Tasks</div>
                                <div class="category"><img src="Hashtag.png" alt="">Pro</div>
                            
                            `
                            newPro(tasker,pro)
            }
            
            person.appendChild(pro)
            person.innerHTML += `
                            <div class="description">${tasker.bio}</div>
                            <div class="price-button">
                                <a href="#" class="view-profile">view profile</a>
                                <div class="price">$35</div>
                                <button class="book">Book Now</button>
                            </div>`
                            people.appendChild(person)
        }
    }

fetchJSONData()


