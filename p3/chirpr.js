cd'use strict';

let last_chirp = null;

let chirp_count = 0;

let insert_chirp_func = function (message_and_context, has_parent = false, player_reply = null) {
    let chirp_contents = message_and_context.message;
    let chirp_grammar = message_and_context.context;
    let chirp_botname = getBotName(chirp_grammar);
    let chirp_playername = getReplyName(chirp_grammar);

    let player_reply_chirp = null;
    if (null != player_reply) {
        player_reply_chirp = document.createElement("div");
        player_reply_chirp.className = "chirp-reply-box";
        let player_reply_chirp_avatar = document.createElement("div");
        player_reply_chirp_avatar.className = "chirp-avatar";
        player_reply_chirp_avatar.innerHTML = chirp_playername;
        player_reply_chirp.appendChild(player_reply_chirp_avatar);

        let player_reply_chirp_contents = document.createElement("div");
        player_reply_chirp_contents.className = "chirp-contents";
        player_reply_chirp_contents.innerHTML = player_reply;
        player_reply_chirp.appendChild(player_reply_chirp_contents);
    }



    let new_chirp = document.createElement("div");
    new_chirp.className = "chirp";

    let new_chirp_avatar = document.createElement("div");
    new_chirp_avatar.className = "chirp-avatar";
    new_chirp.appendChild(new_chirp_avatar);
    new_chirp_avatar.innerHTML = chirp_botname;

    let new_chirp_contents = document.createElement("div");
    new_chirp_contents.className = "chirp-contents";
    new_chirp.appendChild(new_chirp_contents);
    new_chirp_contents.innerHTML = chirp_contents;
    let reply_button = document.createElement("button");
    reply_button.innerHTML = "reply";
    reply_button.className = "reply-button chirp-button noselect";
    reply_button.chirpContext = JSON.stringify(chirp_grammar);
    //console.log("stringify");
    //console.log(chirp_grammar);
    new_chirp.appendChild(reply_button); 

    if(false == has_parent) {
        new_chirp.dataset.nesting = 0;
        reply_button.dataset.nesting = 0;
        //if(null != player_reply_chirp) { 
        //   last_chirp = document.getElementById("timeline").insertBefore(player_reply_chirp_chirp, last_chirp);
        //}
        last_chirp = document.getElementById("timeline").insertBefore(new_chirp, last_chirp);
        
    } else {
        let nesting_level = parseInt(has_parent.parentNode.dataset.nesting);
        new_chirp.className = new_chirp.className + " reply-to-chirp " + (0 == (nesting_level % 2) ? "nesting-even" : "nesting-odd");;
        new_chirp.dataset.nesting = nesting_level;
        
        reply_button.dataset.nesting = parseInt(has_parent.parentNode.dataset.nesting);
        if(null != player_reply_chirp) {
            player_reply_chirp.appendChild(new_chirp);
            has_parent.parentNode.insertBefore(player_reply_chirp, has_parent.parentNode.getElementsByClassName("send-button")[0].nextSibling);
        } else {
           has_parent.parentNode.insertBefore(new_chirp, has_parent.parentNode.getElementsByClassName("send-button")[0].nextSibling);
        }
    }

    reply_button.addEventListener("click", function() {
        let internal_grammar = this.dataset.grammar;
        let new_reply = document.createElement("div");
        let nesting_level = parseInt(this.dataset.nesting) + 1;
        new_reply.dataset.nesting = nesting_level;
        new_reply.className = "chirp chirp-reply";

        this.parentNode.appendChild(new_reply);

        let text_reply_box = document.createElement("input");
        text_reply_box.type = "text";        
        text_reply_box.className = "chirp-input";
        new_reply.appendChild(text_reply_box);

        let send_button = document.createElement("button");
        send_button.innerHTML = "send";
        send_button.className = "reply-button send-button chirp-button noselect";
        send_button.dataset.grammar = internal_grammar;
        new_reply.appendChild(send_button);

        let respondToClick = function() {
            let sent_input = this.parentNode.getElementsByClassName("chirp-input")[0].value;
            //let test_output_text = getMyReply(sent_input, JSON.parse(JSON.parse(this.dataset.grammar)));

            let output_text = makeReply(sent_input, chirp_grammar);
            
            if(("" != output_text.message) && (null != output_text.message) && (undefined != output_text.message)) {
                insert_chirp_func(output_text, this, sent_input);
            }
            chirp_count += 1;

            send_button.style.display = "none";
            text_reply_box.style.display = "none";
        }

        send_button.addEventListener("click", respondToClick);
        text_reply_box.addEventListener("keyup", function(event) {
            event.preventDefault();
            if(event.which == 13) {
                send_button.click();
            }
        });
    });

    return chirp_grammar;
}

document.getElementById("send-chirp").addEventListener("click", function() {
    insert_chirp_func(makeChirp());
});

