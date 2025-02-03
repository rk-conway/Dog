const BASE_URL = `https://dog.ceo/api/breeds/image/random`;
let dog = null;
let dogArr = [];

async  function getData() {
    try{
        const res = await fetch(`${BASE_URL}`);
        const image = await res.json();
        console.log(image);
        
        if(image){
            document.querySelector('.card').style.background = `url(${image.message}) no-repeat center/cover`;
            document.querySelector('img').src = image.message;
            dog = image;
        }
        
        if(!res.status){
            throw Error("Whoofps scooby says something went wrong")
        }
    }
    catch(e){
        console.log(e)
    }
    finally{
        console.log("Scooby's yearbook");
    }
}

getData();


function addLocalStorage(newDog,dogArray='likedDogs'){
    if(!dog) return;
    
    const localDogArr = localStorage.getItem(dogArray);
    
    if(localDogArr){
        localStorage.removeItem(dogArray);
        let newDogArr = JSON.parse(localDogArr);
        console.log("the current dog array:",newDogArr);
        let exists = newDogArr.find((e)=>e.message === newDog.message);
        if(!exists){
            newDogArr.push(newDog);
        }
        localStorage.setItem(dogArray,JSON.stringify(newDogArr));
        
    }else{
        let objDogArr = [];
        objDogArr.push(newDog);
        console.log("this is the initialized arr: ",objDogArr);
        localStorage.setItem(dogArray,JSON.stringify(objDogArr));
    }
}

function getLocalStorage(dogArray='likedDogs'){
    const localDogArr = localStorage.getItem(dogArray);
    
    if(localDogArr){
        return JSON.parse(localDogArr);
    }else{
        return null;
    }
}

function setLocalGallery(){
    
    selectPage(1);
    
    let imageArr = getLocalStorage();
    if(imageArr){
        let likedDogs = '';
        imageArr.map((i)=>{
            likedDogs += `
                <div class="liked-dog" style="background: url(${i.message}) no-repeat center/cover">
            
                </div>
            `;
            document.querySelector('.liked-dogs').innerHTML = likedDogs;
        })
    }
}

function setLocalBookmarkedGallery(){
    
    selectPage(2);
    
    let imageArr = getLocalStorage('bookmarkedDogs');
    if(imageArr){
        let bookmarkedDogs = '';
        imageArr.map((i)=>{
            bookmarkedDogs += `
                <div class="bookmarked-dog" style="background: url(${i.message}) no-repeat center/cover">
            
                </div>
            `;
            document.querySelector('.bookmarked-dogs').innerHTML = bookmarkedDogs;
        })
    }
}

function selectPage(target = 0){
    const allPages = document.querySelectorAll('section');
    const allPageLinks= document.querySelectorAll('.page-link');
    
    if(allPages){
        for(i=0;i<allPages.length;i++){
            allPages[i].style.display = 'none';
        }
        allPages[target].style.display = 'block';
    }
    
    if(allPageLinks){
        for(i=0;i<allPageLinks.length;i++){
            allPageLinks[i].classList.remove('active');
        }
        allPageLinks[(target+1)%3].classList.add('active');
    }
}

selectPage(0);