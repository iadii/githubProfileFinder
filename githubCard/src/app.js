
const Adii = document.querySelector('.Adii');
const inp = document.querySelector('.inp')
const btnSearch = document.querySelector('#search');

const main = document.createElement('div')
Adii.appendChild(main);
main.classList.add('mt-9','p-8', 'rounded-3xl')

btnSearch.addEventListener('click', (e)=> {
    e.preventDefault();


    const usr = inp.value;

    const requestURL = `https://api.github.com/users/${usr}`

    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL);
    let data

    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);

        if(xhr.readyState === 4){
            data = JSON.parse(this.responseText)
            console.log("user Follower: ",data.followers)

            removeAllChildElements(main, inp);  

            const img = document.createElement('img');
            img.src = data.avatar_url;
            main.appendChild(img);  
            img.classList.add('img' ,'mb-4','rounded-3xl','w-70');

            const box = document.createElement('div');
            main.appendChild(box);
            box.classList.add('box','text-2xl')
            box.style.display = 'flex'
            box.style.flexDirection = 'column'
            box.style.width = '480px'
            box.style.justifyContent = 'space-between';
            // box.style.gap = '27rem'

            

            const userName = document.createElement('span');
            userName.innerText = `Username : ${data.login}`;
            box.append(userName);
            userName.classList.add('userName','text-yellow-50')

            const name = document.createElement('span');
            name.innerText = `Name : ${data.name}`;
            box.append(name);
            name.classList.add('name', 'text-yellow-50')

            const bio = document.createElement('span');
            bio.innerText = `bio : ${data.bio}`;
            box.append(bio);
            bio.classList.add('bio', 'text-yellow-50')

            const follower = document.createElement('span');
            follower.innerHTML = `Followers : ${data.followers}`;
            box.append(follower);
            follower.classList.add('follower', 'text-yellow-50')

            const following = document.createElement('span');
            following.innerHTML = `Following : ${data.following}`;
            box.append(following);
            following.classList.add('following', 'text-yellow-50');

            const repoURL = `https://api.github.com/users/${usr}/repos`;
            fetch(repoURL)
              .then(response => response.json())
              .then(repos => {
                const repoList = document.createElement('ul');
                repoList.innerHTML = "repos :"
                repoList.classList.add('text-stone-400')
                // box.appendChild(repoList);
                repos.forEach(repo => {
                  const repoItem = document.createElement('li');
                  repoItem.innerText = repo.name;
                  repoList.appendChild(repoItem);
                });
              })
              .catch(error => console.error('Error fetching repositories:', error));

              

            main.classList.add('bg-[#C94277]')
        }
    }

    console.log(xhr.readyState);
    xhr.send()

    

})

function removeAllChildElements(parent, excludeElement) {
    while (parent.firstChild) {
        if (parent.firstChild !== excludeElement) {
            parent.removeChild(parent.firstChild);
        } else {
            break;
        }
    }
}

window.addEventListener('keydown', (e) => {

    if(e.keyCode == 191){
        inp.focus()
        e.preventDefault()
    }
})