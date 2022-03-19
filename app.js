    function getData(){

        //get the value of the input box
        var userInput = document.getElementById("input").value

        fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${userInput}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
            "x-rapidapi-key": YOUR-API-KEY
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
        
        
    }

    function appendData(data){
        
        var title = document.getElementById("title")
        var word = document.getElementById("word")

        //get def div
        var mainContainer = document.getElementById("def");
        
        //if main container has no child nodes add some
        if (mainContainer.childNodes.length === 0){
            for (var i = 0; i < data.list.length; i++){
        
                //create a new div in def
                var div = document.createElement("div")
                div.className = "definition-container"
                //add this new div to our main container
                mainContainer.appendChild(div);
                
                var definitions = document.createElement("p");
                definitions.className = "defi"
                definitions.innerHTML = data.list[i].definition;
                //add p to the newly created div
                div.appendChild(definitions);

                var thumbs = document.createElement("div")
                thumbs.className = "thumbs"
                div.appendChild(thumbs)

                var thumbsUp = document.createElement("div")
                thumbsUp.className = "thumbs-up"
                thumbs.appendChild(thumbsUp)

                var imgUp = document.createElement("img")
                imgUp.src = "images/thumbs-up-svgrepo-com.svg"
                thumbsUp.appendChild(imgUp)

                var upVote = document.createElement("p")
                upVote.className = "votes"
                upVote.innerHTML = data.list[i].thumbs_up.toString()
                thumbsUp.appendChild(upVote)


                var thumbsDown = document.createElement("div")
                thumbsDown.className = "thumbs-down"
                thumbs.appendChild(thumbsDown)

                var imgDown = document.createElement("img")
                imgDown.src = "images/thumbs-down-svgrepo-com.svg"
                thumbsDown.appendChild(imgDown)

                var downVote = document.createElement("p")
                downVote.className = "votes"
                downVote.innerHTML = data.list[i].thumbs_down.toString()
                thumbsDown.appendChild(downVote)

            }
        } else {

            //if does have child nodes we know there is definitions on the screen already. just update the innerHTML in the nodes
            var defCheck = document.getElementsByClassName("defi")
            for (var i = 0; i < data.list.length; i++){
                defCheck[i].innerHTML = data.list[i].definition;
            }
        }

        //if word is null create an element for it
        if (word == null){
            //create a p tag for the title
            var p = document.createElement("p")
            p.id = "word"
            p.innerHTML = document.getElementById("input").value
            title.after(p)
        } else {
            //if its not null, we know there is a word on the screen already. just update the innerHTML
            word.innerHTML = document.getElementById("input").value
        }

        



        
    }


