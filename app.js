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
            // document.querySelector('img').src = image.message;
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


function addLocalStorage(newDog){
    if(!dog) return;
    
    const localDogArr = localStorage.getItem("dogArray");

    if(localDogArr){
        let newDogArr = JSON.parse(localDogArr);
        console.log("the current dog array:",newDogArr);
        newDogArr.push(newDog);
        localStorage.setItem("dogArray",JSON.stringify(newDogArr));

    }else{
        let objDogArr = [];
        objDogArr.push(newDog);
        console.log("this is the initialized arr: ",objDogArr);
        localStorage.setItem("dogArray",JSON.stringify(objDogArr));
    }
}