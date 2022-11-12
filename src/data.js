const apiKey = '41faC7sbbXghRhydcKcquKi4Z4eAQ7XvjXAQQeVZ';
let page = 1;


// fetch es una promesa
const peticion = fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}&page=${page}`);

peticion
    .then( resp => resp.json())
    .then( data => {
        const photos = data.latest_photos;
        let htmlTemplate = '';
        photos.forEach(photo => {
            htmlTemplate += `<img src="${photo.img_src}">`;
            console.log(htmlTemplate);
            
        });
        document.querySelector('.content__photos').innerHTML += htmlTemplate;

    })
    
