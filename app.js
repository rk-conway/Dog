async  function getData() {
    try{
        const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
        const image = await res.json();
        console.log(image);
        
        if(image){
            document.querySelector('.card').style.background = `url(${image.message}) no-repeat center/cover`;
            document.querySelector('img').src = image.message;
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