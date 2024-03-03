const loadAllPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const postData = data.posts;
    displayData(postData)
    // console.log(postData);
}

const displayData = (allPosts) => {
    // console.log(allPosts)
    const postContainer = document.getElementById('post-container');
    allPosts.forEach(post => {
        // console.log(post);
        const div = document.createElement('div');
        // div.classList = `hero-content flex-col lg:flex-row`;
        div.classList.add('hero-content', 'flex-col', 'lg:flex-row','lg:items-start');
        div.innerHTML = ` <img class="w-14 rounded-full" src="${post.image}"
        class="max-w-sm rounded-lg shadow-2xl" />

        <div class="badge ${post.isActive?'badge-primary' : 'badge-secondary'}  badge-sm relative ml-[-20px]"></div>

    <div>

        <h2># <span>${post.category}</span> author: <span>${post.author.name}</span></h2>
        <h1 class="text-3xl font-bold">${post.title}</h1>
        <p class="py-6">${post.description}</p>

        <div class="divider"></div>

        <div class="flex justify-between items-center">
            <div>
                <ul class="flex gap-4">
                    <li><i class="fa-regular fa-message"></i> <span>${post.comment_count}</span></li>
                    <li><i class="fa-regular fa-eye"></i>${post.view_count}</li>
                    <li><i class="fa-regular fa-clock"></i><span>${post.posted_time}min</span></li>
                </ul>
            </div>
            <div onclick="addTitleView('${post.title}', '${post.view_count}')" class="bg-green-500 rounded-full p-2">
                <i class="fa-solid fa-envelope-open-text"></i>
            </div>
        </div>

    </div>`;
        postContainer.appendChild(div);
    })
}

const categoryDisplay = (category)=>{
    displayData(category)
}

const categoryByPostLoad = async ()=>{
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    const inputText = document.getElementById('input-text').value;
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
    const data = await res.json();
    categoryDisplay(data.posts)
    console.log(data.posts);
}






const latestPostLoad = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const latestData = await res.json();
    displayLatest(latestData);
}

const displayLatest = (latests) => {
    // console.log(latests);
    const latestContainer = document.getElementById('latest-posts');

    latests.forEach(latest => {
        // console.log(latest)
        const div = document.createElement('div');
        div.classList.add('card', 'w-96', 'glass');
        div.innerHTML = `  <figure><img src="${latest.cover_image}"
       alt="car!" /></figure>
        <div class="card-body">
            <p><i class="fa-regular fa-calendar-days"></i> ${latest.author.posted_date}</p>
            <h2 class="card-title">${latest.title}</h2>
            <p>${latest.description}</p>
            <div class="flex gap-10 items-center">
            <img class="w-14 rounded-full" src="${latest.
                profile_image
                }"/>
                <div>
                    <h2>${latest.author.name}</h2>
                    <p>${latest.author.designation?latest.author.designation : 'unknown'}</p>
                </div>
            </div>
        </div>
`;
        latestContainer.appendChild(div);
    })
}

let count = 1;
const addTitleView = (title , view)=>{
    const markRead = document.getElementById('markRead');
    markRead.innerText = count;
    count++;

    const titleView = document.getElementById('title-view');
    const div = document.createElement('div');
    div.classList.add('card-body', 'shadow-xl');
    div.innerHTML = `
    <div class="md:flex items-center">
         <h2 class="card-title">${title}</h2>
         <i class="fa-regular fa-eye"></i><span>${view}</span>
  </div>
    `;
    titleView.appendChild(div);
    console.log(title, view)
}


latestPostLoad();

loadAllPost();

