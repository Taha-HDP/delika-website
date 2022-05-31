var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.getElementsByTagName('body')[0].appendChild(script);

//const domain = "https://delikagallery.iran.liara.run";
const domain = "http://localhost:3000";
//------------- header & footer data
function loadHeaderAndFooter() {
    document.querySelector("header#top").innerHTML = `
            <div class="first-header">
                <a href="/en/bag.html" id="bag_icon">
                    <div class="icon" id="shop">
                        <div id="bag_pic">
                        </div>
                        <div id="bag">
                            <h3>shopping bag</h3>
                        </div>
                    </div>
                </a>
                <div id="bag_preview">
                    <h3 id="item_count">shopping bag : 0</h3>
                    <div id="Data"> </div>
                    <div class="checkout_box">
                        <h4 class="total">total :</h4>
                        <h4 class="total_money">0</h4>
                        <a href="/en/bag.html" class="button">
                            <button>go to shopping bag</button>
                        </a>
                    </div>
                </div>
                <a href="/en/profileView/specification.html" class="icon" id="profile">
                    <h3>profile</h3>
                </a>
                <div id="contact">
                    <h3 onclick="contact_us()">contact us</h3>
                </div>
                <div id="lang" onclick="lang_list_transform()">language : english</div>
                <div id="lang-list">
                    <h4>select language</h4>
                    <label for="languages">Persian (FA)</label>
                    <input type="radio" name="languages" id="persian">
                    <label for="languages">english (EN)</label>
                    <input type="radio" name="languages" id="english" checked>
                    <label for="languages">arabic (AR)</label>
                    <input type="radio" name="languages" id="arabic">
                    <button id="submit" onclick="current_lang()">confirm</button>
                </div>
            </div>
            <div id="delika_logo"></div>
            <div class="middle_header">
                <div id="web-name" onclick="lang_list_close()">
                    <h1>Delika Gallery</h1>
                </div>
                <div class="secound-header">
                    <ul id="menu">
                        <li> <a href="/en" id="home-page">Home</a> </li>
                        <li id="Painting"> <a href="/en/paint.html" id="painting">Paint</a> </li>
                        <li id="Sculpture"> <a href="/en/sculpture.html" id="sculpture">sculpture</a> </li>
                        <li id="Learning"> <a href="/en/learning_classes.html" id="learning">Attendance classes</a> </li>
                        <li> <a href="/en/self_request.html" id="self-request">Order a personal design</a> </li>
                        <li> <a href="/en/help_request.html" id="help-request">Consultation request</a> </li>
                        <li> <a href="/en/about_us.html" id="about_us">About us</a> </li>
                    </ul>
                </div>
            </div>
            <div id="secound-header-list">
                <ul id="list"></ul>
            </div>
        ` ;
    document.querySelector("article#hiden_contact").innerHTML = `
        <h2>Contact us
            <div class="back" onclick="backToHome('block')">
                <div class="xy"></div>
                <div class="yx"></div>
            </div>
        </h2>
        <div id="ways">
            <div id="call" class="items">
                <div class="contact-picture"></div>
                <h3>phone</h3>
                <p>From Saturday to Thursday <br> 9 AM to 9 PM</p>
                <a id="phone_href_1" href="#" class="call-box">
                    <p></p>
                </a>
            </div>
            <div id="email" class="items">
                <div class="contact-picture"></div>
                <h3>Email</h3>
                <p>You can easily contact us via email</p>
                <p></p>
                <a id="email_address" href="#" class="call-box">
                    <p>Send email</p>
                </a>
            </div>
            <div id="instagram" class="items">
                <div class="contact-picture"></div>
                <h3>instagram</h3>
                <p>You can stay in touch with us full time via Instagram Direct</p>
                <a href="#" class="call-box">
                    <p id="insta_id"></p>
                </a>
            </div>
        </div>
        ` ;
    document.getElementsByTagName("footer")[0].innerHTML = `
        <div class="ending">
            <div class="titr">
                <h3>About Delika</h3>
                <hr>
                <p id="about_site"></p>
            </div>
            <div class="titr">
                <h3>Site sections</h3>
                <hr>
                <ul>
                    <li> <a href="/en">Home/a> </li>
                    <li> <a href="/en/paint.html" >Paint</a> </li>
                    <li> <a href="/en/sculpture.html">sculpture</a> </li>
                    <li> <a href="/en/learning_classes.html">Attendance classes</a> </li>
                    <li> <a href="/en/self_request.html">Order a personal design</a> </li>
                    <li> <a href="/en/help_request.html">Consultation request</a> </li>
                    <li> <a href="/en/About.html">About us</a> </li>
                </ul>
            </div>
            <div class="titr">
                <h3>Contact us</h3>
                <hr>
                <ul class="contact">
                    <li>
                        <div class="contact-pic" id="email-pic"></div>
                        <p>Email : </p>
                        <a href="#" id="site_email"></a>
                    </li>
                    <li>
                        <div class="contact-pic" id="instagram-pic"></div>
                        <p>instagram : </p>
                        <a href="#" id="site_instagram"></a>
                    </li>
                    <li>
                        <div class="contact-pic" id="call-pic"></div>
                        <p>phone : </p>
                        <a href="#" id="phone_number_1"></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="coppyright">
            <p>All rights to the products and content of this site belong to Delika and any copying of the content and products of the site is unauthorized and without our consent.</p>
        </div>
        ` ;
    if (!localStorage.getItem("token")) {
        document.getElementById("profile").href = "/en/register.html";
        document.getElementById("profile").innerHTML = "<h3> sign up / login  </h3>";
    }
    axios.get(domain + "/api/site_data").then(res => {
        document.getElementById("about_site").innerHTML = res.data.about;
        document.getElementById("site_instagram").innerHTML = res.data.instagram;
        document.getElementById("insta_id").innerHTML = res.data.instagram;
        document.getElementById("insta_id").style.direction = "ltr";
        document.getElementById("site_instagram").href = res.data.instagramLink;
        document.getElementById("site_instagram").style.direction = "ltr";
        document.getElementsByClassName("call-box")[2].href = res.data.instagramLink;
        document.getElementById("site_email").innerHTML = res.data.email;
        document.getElementById("site_email").href = "mailto:" + res.data.email;
        document.getElementById("email_address").href = "mailto:" + res.data.email;
        document.getElementById("phone_number_1").innerHTML = res.data.phone;
        document.getElementById("phone_number_1").style.direction = "ltr";
        document.getElementById("phone_number_1").href = "tel:" + res.data.phone;
        document.getElementById("phone_href_1").href = "tel:" + res.data.phone;
        document.querySelector("#phone_href_1 p").innerHTML = res.data.phone;
        document.querySelector("#phone_href_1 p").style.direction = "ltr";
        if (res.data.phone_2 != "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="contact-pic" id="call-pic"></div>
                <p>phone : </p>
                <a href="tel:${res.data.phone_2}">${res.data.phone_2}</a>
            ` ;
            document.getElementsByClassName("contact")[0].appendChild(li)
        }
    }).catch(err => {
        window.location.assign("../500.html");
    });
}
//--------------- header popout list
var check_list;
$(document).ready(function () {
    window.scroll(0, 0);
    var now = new Date().getDay();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime) {
        if (parseInt(now) - parseInt(setupTime) > 5) {
            localStorage.removeItem('token');
            localStorage.removeItem('basket');
            localStorage.removeItem('setupTime');
        } else {
            localStorage.removeItem('setupTime');
            localStorage.setItem('setupTime', now);
        }
    }
    $(document).mousemove(function () {
        $("#bag_icon").mouseenter(function () {
            if (window.innerWidth > 670) {
                document.getElementById("bag_preview").style.transform = "translateY(0)";
            }
        })
        $("#mid").mouseenter(function () {
            document.getElementById("bag_preview").style.transform = "translateY(-500px)";
        })
        $(".middle_header").mouseenter(function () {
            document.getElementById("bag_preview").style.transform = "translateY(-500px)";
        })
    });
});
//--------------------- register form check
function add_member() {
    const email = document.forms["signin"]["email"].value;
    const password = document.forms["signin"]["password"].value;
    const username = document.forms["signin"]["username"].value;
    const phone = document.forms["signin"]["phone"].value;
    if (!email || !password || !username || !phone) {
        window.scroll(0, 0);
        let text = "You have to complete all the parts !";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        return false;
    } else if (document.forms["signin"]["password-check"].value != password) {
        window.scroll(0, 0);
        let text = "The passwords entered are not the same";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        return false;
    } else if (password.length < 6) {
        window.scroll(0, 0);
        let text = "Password must be at least 6 characters long";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        return false;
    } else if (phone.length != 11) {
        window.scroll(0, 0);
        let text = "The entered number is not valid";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        return false;
    } else {
        let body = {
            "email": email,
            "password": password,
            "username": username,
            "phone": phone,
        }
        axios.post(domain + "/api/register", body).then(res => {
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.removeItem('setupTime');
            localStorage.setItem('setupTime', new Date().getDay());
            window.location.assign("/en");
            return false;
        }).catch(err => {
            window.scroll(0, 0);
            let text = "This number / email / username is already registered in the system !";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
            return false;
        });
        return false;
    }
    return false;

}
function login_member() {
    let username, password;
    username = document.forms["login"]["username"].value;
    password = document.forms["login"]["password"].value;
    if (!username || !password) {
        let text = "You have to complete all the parts !";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    } else if (password.length < 6) {
        window.scroll(0, 0);
        let text = "Password must be at least 6 characters long";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    } else {
        axios.post(domain + "/api/login", { username, password }).then(res => {
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.removeItem('setupTime');
            localStorage.setItem('setupTime', new Date().getDay());
            window.location.assign("/en");
        }).catch(err => {
            window.scroll(0, 0);
            let text = "No user was found with this information.";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        });
    }
}
function check_loged() {
    if (localStorage.getItem("token")) {
        window.location.assign("/en");
    }
}
function password_mode(id) {
    const eye = document.getElementById(id);
    if (eye.checked == true) {
        if (id == "login_eye") {
            document.getElementById("pass").type = "text";
        } else if (id == "signin_eye") {
            document.getElementById("password").type = "text";
            document.getElementById("password-check").type = "text";
        }
    } else {
        if (id == "login_eye") {
            document.getElementById("pass").type = "password";
        } else if (id == "signin_eye") {
            document.getElementById("password").type = "password";
            document.getElementById("password-check").type = "password";
        }
    }
}
//----------------------- language setting
var lang_state = false;
function lang_list_transform() {
    var language = document.getElementById("lang");
    var element = document.getElementById("lang-list");
    if (lang_state == false) {
        element.style.transform = "translateY(2px)";
        language.style.paddingBottom = "0.3rem";
        language.style.borderBottom = "2px solid black";
        lang_state = true;
    } else if (lang_state == true) {
        element.style.transform = "translateY(-300px)";
        language.style.paddingBottom = "0rem";
        language.style.borderBottom = "none";
        lang_state = false;
    }
}
function lang_list_close() {
    var element = document.getElementById("lang-list");
    var language = document.getElementById("lang");
    if (lang_state == true) {
        element.style.transform = "translateY(-500px)";
        language.style.paddingBottom = "0rem";
        language.style.borderBottom = "none";
        lang_state = false;
    }
}
function current_lang() {
    var persian = document.getElementById("persian");
    var english = document.getElementById("english");
    var arabic = document.getElementById("arabic");
    if (persian.checked) {
        window.location.href = '/';
        lang_list_close();
    } else if (english.checked) {
        window.location.href = '/en';
        lang_list_close();
    } else if (arabic.checked) {
        window.location.href = '/ar';
        lang_list_close();
    }
}
//----------------------- contact & register load page
function contact_us() {
    const home_pg = document.getElementsByTagName("article")[1];
    const contact_pg = document.getElementsByTagName("article")[0];
    window.scroll(0, 0);
    home_pg.style.display = "none";
    contact_pg.style.display = "block";
}
function backToHome(display) {
    const home_pg = document.getElementsByTagName("article")[1];
    const contact_pg = document.getElementsByTagName("article")[0];
    window.scroll(0, 0);
    home_pg.style.display = display;
    contact_pg.style.display = "none";
}
//------------------------ checking for auth
function check_auth() {
    if (!localStorage.getItem("token")) {
        document.getElementById("profile").href = "/en/register.html";
        document.getElementById("profile").innerHTML = "<h3> sign up / login  </h3>";
    }
}
let sended_code, forgetPassEmail, forgetPasswordProj = 0;
function forget_password() {
    const information = document.getElementById("information");
    const label = document.getElementsByTagName("label")[3];
    const user_email = document.getElementsByTagName("input")[3];
    if (forgetPasswordProj == 0) {
        forgetPassEmail = user_email.value;
        axios.post(domain + "/api/forgetPassword", { email: user_email.value }, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data == "not found") {
                const text = "No account has been registered with this number";
                call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
            } else {
                sended_code = res.data.code;
                information.innerHTML = "Enter the code sent in this field:";
                label.innerHTML = "";
                user_email.value = "";
                user_email.placeholder = "_ _ _ _";
                forgetPasswordProj = 1;
            }
        }).catch(err => {
            window.location.assign("../500.html");
        });
    } else if (forgetPasswordProj == 1) {
        const member_code = document.getElementsByTagName("input")[3];
        if (member_code.value == sended_code) {
            information.innerHTML = "Enter the new password:";
            member_code.value = "";
            member_code.placeholder = "new password";
            forgetPasswordProj = 2;
        } else {
            const text = "The code entered is incorrect !";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        }
    } else if (forgetPasswordProj == 2) {
        const new_password = document.getElementsByTagName("input")[3].value;
        if (!new_password) {
            const text = "Enter your password!";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        } else if (new_password.length < 6) {
            const text = "Password must be longer than 6 characters";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        } else {
            axios.put(domain + "/api/newPassword", {
                password: new_password,
                email: forgetPassEmail,
            }).then(res => {
                const text = "Password or success registered";
                call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");
                setTimeout(() => {
                    window.location.href = "/en";
                }, 3000);
            }).catch(err => {
                window.location.assign("../500.html");
            });
        }

    }
}
//------------------------ help request page
function help_request_data() {
    const id = localStorage.getItem("token");
    if (id) {
        axios.get(domain + "/api/requestData", {
            headers: {
                'x-auth-token': id
            }
        }).then(res => {
            document.getElementById("request_phone").value = res.data.phone;
            document.getElementById("request_name").value = res.data.name;
        }).catch(err => {
            window.location.assign("../500.html")
        });
    }
}
function send_help_request() {
    const id = localStorage.getItem("token");
    if (id) {
        let type_check;
        if (document.getElementById("Call").checked == true) {
            type_check = "call";
        } else {
            type_check = "see";
        }
        const name = document.getElementById("request_name").value;
        const phone = document.getElementById("request_phone").value;
        const type = type_check;
        const info = document.getElementById("request_detail").value;
        const body = {
            "name": name,
            "phone": phone,
            "type": type,
            "info": info,
        }
        axios.post(domain+"/api/sendRequest", body, {
            headers: {
                'x-auth-token': id
            }
        }).then(res => {
            const text = "Your request has been sent successfully";
            call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");
            setTimeout(() => {
                window.location.href = "/en//profileView/help_request.html";
            }, 4000);
        }).catch(err => {
            const text = "You have an open request, to view, go to the Requests section in the profile";
            call_cs_popup(text, 5000, "#5D101D", "#ffd5da", "#390b1b");
        });
    } else {
        const text = "You must register to submit an request";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    }
}
//---------------------- sort list functions
var sort_option = [
    "expensive",
    "cheapest",
    "bestselling",
    "news"
]
let item_sort = "";
function create_sorting_list(mode) {
    var father = document.getElementById("sorting");
    for (var i = 0; i < 4; i++) {
        var option = document.createElement("li");
        option.id = sort_option[i];
        var pointer = document.createElement("div");
        pointer.className = "sort_pointer";
        option.appendChild(pointer);
        var header = document.createElement("h4");
        header.innerHTML = sort_option[i];
        option.appendChild(header);
        father.appendChild(option);
        option.addEventListener("click", function () {
            sorting_pointer(this.id, mode);
        }, false)
    }
    sorting_pointer("news", mode);
}
function sorting_pointer(element, mode) {
    item_sort = element;
    var pointer = document.getElementsByClassName("sort_pointer");
    for (var i = 0; i < sort_option.length; i++) {
        if (element == sort_option[i]) {
            pointer[i].style.display = "block";
            continue;
        }
        pointer[i].style.display = "none";
    }
    if (mode == "paint")
        load_paint_item();
    else if (mode == "sculpture")
        load_sculpture_item();
}
//------------------------ shop
function load_paint_item() {
    load_item("painting", item_sort);
}
function load_sculpture_item() {
    load_item("sculpture", item_sort);
}
function load_item(mode, sort) {
    document.getElementById("ware").innerHTML = "";
    axios.post(domain + "/api/items", { type: mode })
        .then(res => {
            let item = res.data;
            if (sort == "news")
                item.reverse();
            else if (sort == "expensive") {
                item.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
                item.reverse();
            } else if (sort == "cheapest") {
                item.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            } else if (sort == "bestselling") {
                item.sort((a, b) => (a.salesNumber > b.salesNumber) ? 1 : ((b.salesNumber > a.salesNumber) ? -1 : 0))
                item.reverse();
            }
            if (item.length > 0) {
                document.getElementById("ware").innerHTML = "";
                for (i in item) {
                    create_shop_item(item[i].picture, item[i].name, item[i].price, item[i]._id);
                }
            } else {
                document.getElementById("ware").innerHTML = `
                    <h3 id="not_founded">not found !</h3>
                    ` ;
            }
        }).catch(err => {
            window.location.href = "../500.html";
        });
}
function create_shop_item(pic, name, price, id) {
    var father = document.getElementById("ware");
    //--- picture
    var box_picture = document.createElement("div");
    box_picture.className = "item-picture";
    const array = pic.split("/");
    picture = array[3];
    box_picture.style.backgroundImage = "url('../public/image/" + picture + "')";
    //--- name
    var box_name = document.createElement("div");
    box_name.className = "item-name";
    var box_text = document.createElement("h3");
    box_text.innerHTML = name;
    box_name.appendChild(box_text);
    //--- price
    var box_price = document.createElement("div");
    box_price.className = "item-price";
    var box_price_text = document.createElement("p");
    box_price_text.innerHTML = price + " $";
    box_price.appendChild(box_price_text);
    //--- create box item
    var box = document.createElement("a");
    box.className = "items";
    box.href = `/en/item_detail.html?place=${id}`;
    box.appendChild(box_picture);
    box.appendChild(box_name);
    box.appendChild(box_price);
    father.appendChild(box);
}
function find_item(type) {
    const search_box = document.getElementById("wanted");
    if (search_box.value == "") {
        switch (type) {
            case "paint":
                load_paint_item();
                break;
            case "sculpture":
                load_sculpture_item();
                break;
        }
    } else {
        document.getElementById("ware").innerHTML = "";
        const search_box = document.getElementById("wanted");
        let result = search_box.value;
        axios.post(domain + "/api/admin/findItem", { wanted: result }, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data) {
                search_box.value = "";
                res.data.reverse();
                res.data.map((item) => {
                    create_shop_item(item.picture, item.name, item.price, item._id)
                });
            } else {
                document.getElementById("ware").innerHTML = `
                <h3 id="not_founded">not found !</h3>
                ` ;
            }
        })
    }
}
function item_page() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    axios.get(domain + "/api/items/" + placeID).then(res => {
        document.getElementById("item_name").innerHTML = res.data.name;
        document.getElementsByClassName("item_data")[0].innerHTML = res.data.type;
        document.getElementsByClassName("item_data")[1].innerHTML = res.data.class;
        document.getElementsByClassName("item_data")[2].innerHTML = res.data.x;
        document.getElementsByClassName("item_data")[3].innerHTML = res.data.y;
        document.getElementsByClassName("item_data")[4].innerHTML = res.data.info;
        document.getElementById("Price").innerHTML = res.data.price + " $";
        let picture = res.data.picture;
        const array = picture.split("/");
        picture = array[3];
        document.getElementsByClassName("picture")[0].style.backgroundImage = "url('../public/image/" + picture + "')";
        if (res.data.comment) {
            const father = document.getElementsByClassName("posted_comment")[0];
            res.data.comment.map((comment) => {
                if (comment.status == "accepted") {
                    const comment_box = document.createElement("div");
                    comment_box.classList.add("comment_box");
                    comment_box.innerHTML = `
                        <h4 class="sender_name">${comment.name}</h4>
                        <p class="sended_date">sent in : ${comment.create_date}</p>
                        <div class="comment_txt_box">${comment.text}</div>
                    ` ;
                    father.appendChild(comment_box);
                }
            });
            if (res.data.length > 9) {
                const button = document.createElement("button");
                button.innerHTML = "See more comments..."
                father.appendChild(button);
            }
        } else {
            console.log("no comment")
        }
    }).catch(err => {
        let text = "Data transfer encountered an error";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    });
}
function add_comment() {
    const body = {
        name: document.getElementById("name").value,
        text: document.getElementById("comment_txt").value,
    }
    if (!body.name || !body.text) {
        let text = "You must enter your name and comment";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    } else {
        const placeID = new URLSearchParams(window.location.search).get("place");
        axios.post(domain + "/api/items/addComment/" + placeID, body).then(res => {
            const text = "Your comment has been successfully submitted and will be displayed by the admin after review";
            call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");
            document.getElementById("name").value = "";
            document.getElementById("comment_txt").value = "";
        }).catch(err => {
            let text = "Data transfer encountered an error";
            call_cs_popup(text, 3000, "#5D101D", "#ffd5da", "#390b1b");
        });
    }
}
function load_intro_items() {
    axios.post(domain + "/api/items").then(res => {
        res.data.reverse();
        for (let i = 0; i < 4; i++) {
            create_shop_item(res.data[i].picture, res.data[i].name, res.data[i].price, res.data[i]._id);
        }
        res.data.reverse();
        res.data.sort((a, b) => (a.salesNumber > b.salesNumber) ? 1 : ((b.salesNumber > a.salesNumber) ? -1 : 0))
        res.data.reverse();
        for (let i = 0; i < 4; i++) {
            let pic = res.data[i].picture;
            const name = res.data[i].name;
            const price = res.data[i].price;
            const id = res.data[i]._id;
            var father = document.getElementById("ware_2");
            //--- picture
            var box_picture = document.createElement("div");
            box_picture.className = "item-picture";
            const array = pic.split("/");
            picture = array[3];
            box_picture.style.backgroundImage = "url('../public/image/" + picture + "')";
            //--- name
            var box_name = document.createElement("div");
            box_name.className = "item-name";
            var box_text = document.createElement("h3");
            box_text.innerHTML = name;
            box_name.appendChild(box_text);
            //--- price
            var box_price = document.createElement("div");
            box_price.className = "item-price";
            var box_price_text = document.createElement("p");
            box_price_text.innerHTML = price + " $";
            box_price.appendChild(box_price_text);
            //--- create box item
            var box = document.createElement("a");
            box.className = "items";
            box.href = `/en/item_detail.html?place=${id}`;
            box.appendChild(box_picture);
            box.appendChild(box_name);
            box.appendChild(box_price);
            father.appendChild(box);
        }
    })
}
//-------------------- checkout
function check_out() {
    const basket_item = (JSON.parse(localStorage.getItem('basket')));
    if (basket_item && basket_item.length != 0) {
        const body = {
            name: document.getElementById("F&Lname").value,
            address: document.getElementById("send_address").value,
            post_code: document.getElementById("post_code").value,
            country: document.getElementById("countrys").value,
            offer: document.getElementById("offer_input").value,
            basket: basket_item,
        }
        if (!body.name || !body.address || !body.post_code || !body.country) {
            const text = "شما باید همه ی قسمت ها را کامل کنید";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
        } else {
            axios.post(domain + "/api/basket/checkOut", body, {
                headers: {
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then(res => {
                window.location.assign(res.data);
            }).catch(err => {
                window.location.assign("../500.html")
            });
        }
    }
}
function bill_result() {
    if (!localStorage.getItem("token")) {
        window.location.assign("/en");
        return 0;
    }
    const mode = new URLSearchParams(window.location.search).get("for");
    const Authority = new URLSearchParams(window.location.search).get("Authority");
    const Status = new URLSearchParams(window.location.search).get("Status");
    if (mode && mode == "course") {
        axios.get(domain + "/api/course/verification?Authority=" + Authority + "&Status=" + Status, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data.succes == true) {
                document.getElementById("pay_status").innerHTML = "thanks for your shopping";
                document.getElementById("payedStatus").innerHTML = "Success";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-happy-100.png')"
                document.getElementById("paymentCode").innerHTML = res.data.refID;
                document.getElementById("gotoprofile").href = "/en/profileView/orders.html";
                document.getElementById("gotoprofile_button").innerHTML = "see detail";
                document.getElementById("gotoprofile").href = "/en/profileView/my_courses.html";
            } else {
                document.getElementById("pay_status").innerHTML = "Payment was by mistake";
                document.getElementById("payedStatus").innerHTML = "Unsuccess";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-sad-100.png')"
                document.getElementsByClassName("textLine")[3].innerHTML = "";
                document.getElementById("gotoprofile_button").innerHTML = "return to classes";
                document.getElementById("gotoprofile").href = "/en/learning_classes.html";
            }
            document.getElementById("memberName").innerHTML = res.data.buyer_name;
            document.getElementById("payed").innerHTML = res.data.total_price + " $";

        }).catch(err => {
            window.location.assign("../500.html")
        });
    } else {
        axios.get(domain + "/api/payment/verification?Authority=" + Authority + "&Status=" + Status, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data.succes == true) {
                document.getElementById("pay_status").innerHTML = "thanks for your shopping";
                document.getElementById("payedStatus").innerHTML = "Success";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-happy-100.png')"
                document.getElementById("paymentCode").innerHTML = res.data.refID;
                document.getElementById("gotoprofile").href = "/en/profileView/orders.html";
                localStorage.removeItem("basket");
                load_basket();
            } else {
                document.getElementById("pay_status").innerHTML = "Payment was by mistake";
                document.getElementById("payedStatus").innerHTML = "Unsuccess";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-sad-100.png')"
                document.getElementsByClassName("textLine")[3].innerHTML = "";
                document.getElementById("gotoprofile_button").innerHTML = "return to shopping bag";
                document.getElementById("gotoprofile").href = "/en/bag.html";
            }
            document.getElementById("memberName").innerHTML = res.data.buyer_name;
            document.getElementById("payed").innerHTML = res.data.total_price + " $";

        }).catch(err => {
            window.location.assign("../500.html")
        });
    }
}
//--------------------- basket
var total = 0, factor_offer = 0;
function load_basket(mode) {
    total = 0;
    const basket_item = (JSON.parse(localStorage.getItem('basket')));
    if (!basket_item || basket_item.length == 0) {
        if (mode == "page") {
            document.getElementById("object_info").innerHTML = `<h4 style="padding: 5%; text-align: center; font-size: 1.3rem;">Your shopping bag is empty</h4>`;
            document.getElementsByClassName("total_money")[0].innerHTML = "0 $";
        } else {
            document.getElementsByClassName("total_money")[0].innerHTML = "0 $";
            if (window.innerWidth > 1024)
                document.getElementById("Data").innerHTML = `<h4 style="padding: 5%; text-align: center; font-size: 1rem;">Your shopping bag is empty</h4>`;
            else
                document.getElementById("Data").innerHTML = `<h4 style="padding: 5%; text-align: center; font-size: 0.7rem;">Your shopping bag is empty</h4>`;
        }
    } else if (basket_item) {
        basket_item.map((item) => {
            axios.get(domain + "/api/items/" + item).then(res => {
                total += parseInt(res.data.price);
                if (mode != "page") {
                    const item_box = document.createElement("div");
                    item_box.classList.add("basket_item_box");
                    document.getElementById("item_count").innerHTML = "shopping bag : " + basket_item.length;
                    document.getElementsByClassName("total_money")[0].innerHTML = total + " $";
                    const array = res.data.picture.split("/");
                    const picture = array[3];
                    item_box.innerHTML = `
                    <div class="basket_item_info">
                        <h4 class="box_name">${res.data.name}</h4>
                        <h4 class="box_type">Grouping : ${res.data.type}</h4>
                        <h4 class="box_class">Style : ${res.data.class}</h4>
                    </div>
                    <div class="box_picture" style="background-image : url('../public/image/${picture}')"></div>
                    <h4 class="box_price">${res.data.price} $</h4>
                    ` ;
                    document.getElementById("Data").appendChild(item_box);
                } else {
                    const item_box = document.createElement("div");
                    item_box.classList.add("object_box");
                    document.getElementById("items_total").innerHTML = total + " $";
                    const array = res.data.picture.split("/");
                    const picture = array[3];
                    item_box.innerHTML = `
                    <div class="basket_object_info">
                        <div class="object_picture" style="background-image : url('../public/image/${picture}')"></div>
                        <div class="objectDetail">
                            <h4 class="object_name">${res.data.name}</h4>
                            <h4 class="object_type">Grouping : ${res.data.type}</h4>
                            <h4 class="object_class">Style : ${res.data.class}</h4>
                            <h4 class="object_shapes">Dimensions : ${res.data.x}x${res.data.y}</h4>
                        </div>
                    </div>
                    <div class="remove_object" onclick = "remove_basket('${item}')">
                        <div class="close"></div>
                        <h3>remove</h3>
                    </div>
                    <h4 class="object_price">${res.data.price} $</h4>
                    ` ;
                    document.getElementById("object_info").appendChild(item_box);
                    load_factor("none")
                }
            }).catch(err => {
                window.location.assign("../500.html");
            });
        });
        if (mode == "page") {
            const token = localStorage.getItem('token');
            if (!token) {
                document.getElementById("checkout").innerHTML = "login / sign up";
                document.getElementById("checkout").onclick = () => { window.location.href = "/en/register.html"; };
            } else {
                document.getElementById("checkout").innerHTML = "Pay";
                document.getElementById("checkout").onclick = () => { check_out() };
                document.getElementById("object_info").innerHTML = "";
                axios.get(domain+"/api/profile/detail", {
                    headers: {
                        'x-auth-token': localStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.data.first_name && res.data.last_name)
                        document.getElementById("F&Lname").value = res.data.first_name + " " + res.data.last_name;
                    if (res.data.address)
                        document.getElementById("send_address").value = res.data.address;
                });
            }
        } else {
            document.getElementById("Data").innerHTML = "";
        }
    }
}
function addToBasket() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    if (placeID) {
        let basket_item = [];
        if (JSON.parse(localStorage.getItem('basket'))) {
            basket_item = (JSON.parse(localStorage.getItem('basket')))
        }
        basket_item.push(placeID);
        localStorage.setItem("basket", JSON.stringify(basket_item));
        const text = "Successfully added to shopping bag";
        call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");
        load_basket();
    }
}
function remove_basket(id) {
    const basket_item = (JSON.parse(localStorage.getItem('basket')));
    if (basket_item) {
        for (let i = 0; i < basket_item.length; i++) {
            if (basket_item[i] == id) {
                basket_item.splice(i, 1);
                localStorage.setItem("basket", JSON.stringify(basket_item));
                load_basket("page");
                total = 0;
                check_offer("country");
                break;
            }
        }
    }
}
function check_offer(mode) {
    const code = document.getElementById("offer_input").value;
    if (!code) {
        if (mode == "country") {
            load_factor("none")
        } else {
            const text = "You must enter the verification code";
            call_cs_popup(text, 3000, "#5D101D", "#ffd5da", "#390b1b");
            factor_offer = 0;
        }
    } else {
        axios.post(domain + "/api/payment/offer_check/" + code)
            .then(res => {
                if (res.data != 0) {
                    load_factor(parseInt(res.data));
                } else {
                    const text = "The entered code is invalid";
                    call_cs_popup(text, 3000, "#5D101D", "#ffd5da", "#390b1b");
                    document.getElementById("offer_input").value = "";
                    factor_offer = 0;
                }
            })
    }
}
function load_factor(code) {
    let factor_total = 0, factor_transport = 0;
    let body = {
        country: document.getElementById("countrys").value,
    }
    axios.post(domain + "/api/payment/factor", body)
        .then(res => {
            factor_transport = res.data.transport;
            if (code != "none") {
                let air = total + factor_transport;
                factor_offer = (code * air) / 100;
            }
            factor_total = (total + factor_transport) - factor_offer;
            document.getElementById("send_money").innerHTML = factor_transport + " $";
            document.getElementById("final_total").innerHTML = factor_total + " $";
            document.getElementById("offer").innerHTML = factor_offer + " $";
        })

}
//--------------------- sekf request
function send_request() {
    if (!localStorage.getItem("token")) {
        let text = "You must be logged in to send request";
        call_cs_popup(text, 3000, "#5D101D", "#ffd5da", "#390b1b");
        return 0;
    }
    const name = document.querySelector("#coustomer_name");
    const type = document.querySelector("#type");
    const x = document.querySelector("#shapes_x");
    const y = document.querySelector("#shapes_y");
    const info = document.querySelector("#info");
    const image = document.getElementById("image");
    if (!name.value || !type.value || !x.value || !y.value || !image.files[0]) {
        let text = "You have to complete all the parts";
        call_cs_popup(text, 3000, "#5D101D", "#ffd5da", "#390b1b");
        return 0;
    }
    const body = new FormData();
    body.append("name", name.value);
    body.append("type", type.value);
    body.append("x", x.value);
    body.append("y", y.value);
    body.append("info", info.value);
    body.append("picture", image.files[0]);
    axios.post(domain + "/api/shop/sendSelfRequest", body, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data == false) {
            const text = "You have an unfinished request. To view go to  profile, Personal Designs section";
            call_cs_popup(text, 5000, "#5D101D", "#ffd5da", "#390b1b");
        } else {
            const text = "Your request has been successfully submitted";
            call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");
        }
        name.value = "";
        type.value = "none";
        x.value = "";
        y.value = "";
        info.value = "";
        image.files[0] = "";
        document.getElementById("uploadLabel").style.backgroundImage = "none";
        document.getElementById("uploadLabel").style.color = "black";
    }).catch(err => {
        window.location.assign("../500.html")
    });

}
//--------------------- notif
function call_cs_popup(text, time, color, background, stroke) {
    const notif = document.getElementById("notfication");
    document.querySelector("#notfication p").innerHTML = text;
    notif.style.color = color;
    notif.style.border = "1px solid " + stroke;
    notif.style.backgroundColor = background;
    notif.style.transform = "translateX(0px)";
    document.getElementById("notif_icon").style.borderLeft = "1px solid" + stroke;
    if (background == "#DAFFE6") {
        document.getElementById("notif_image").style.backgroundImage = "url(../public/images/cheked_icon.png)";
    } else if (background == "#ffd5da") {
        document.getElementById("notif_image").style.backgroundImage = "url(../public/images/wrong_icon.png)";
    }
    if (time != 0) {
        setTimeout(() => {
            notif.style.transform = "translateX(-1000px)";
        }, time);
    }
}