var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
script.type = 'text/javascript';
document.getElementsByTagName('body')[0].appendChild(script);

const home_pg_link = "/index.html";
//--------------- header popout list
var check_list;
$(document).ready(function () {
    var father_element = document.getElementById("list");
    var all = document.getElementById("secound-header-list");
    $(document).mousemove(function () {
        $("#Painting").mouseenter(function () {
            create_underline("Painting");
            for (var i = 1; i < 40; i++) {
                var option = document.createElement("li");
                var txt = document.createElement("h4");
                txt.innerHTML = painting_art_fa[i];
                option.id = painting_art[i];
                option.appendChild(txt);
                father_element.appendChild(option);
                option.addEventListener("click", function () {
                    localStorage.setItem("homeTypeSelected", this.id);
                    window.location.href = "./paint.html";
                }, false);
            }
            all.style.transform = "translateY(0)";
            all.style.transition = "transform 400ms";
            check_list = true;
        })
        $("#Pottery").mouseenter(function () {
            create_underline("Pottery");
            for (var i = 1; i < 12; i++) {
                var option = document.createElement("li");
                var txt = document.createElement("h4");
                txt.innerHTML = pottery_art_fa[i];
                option.id = pottery_art[i];
                option.appendChild(txt);
                father_element.appendChild(option);
                option.addEventListener("click", function () {
                    localStorage.setItem("homeTypeSelected", this.id);
                    window.location.href = "./pottery.html";
                }, false);
            }
            all.style.transform = "translateY(0)";
            all.style.transition = "transform 400ms";
            check_list = true;
        })
        $("#Sculpture").mouseenter(function () {
            create_underline("Sculpture");
            for (var i = 1; i < 10; i++) {
                var option = document.createElement("li");
                var txt = document.createElement("h4");
                txt.innerHTML = sculpture_art_fa[i];
                option.id = sculpture_art[i];
                option.appendChild(txt);
                father_element.appendChild(option);
                option.addEventListener("click", function () {
                    localStorage.setItem("homeTypeSelected", this.id);
                    window.location.href = "./sculpture.html";
                }, false);
            }
            all.style.transform = "translateY(0)";
            all.style.transition = "transform 400ms";
            check_list = true;
        })
        $("#Learning").mouseenter(function () {
            create_underline("Learning");
            var learning_classes = [
                "paint",
                "pottery",
                "sculpture",
            ];
            var learning_classes_fa = [
                "کلاس های نقاشی",
                "کلاس های نقاشی روی سفال",
                "کلاس های مجسمه سازی",
            ];
            for (var i = 0; i < 3; i++) {
                var option = document.createElement("li");
                var txt = document.createElement("a");
                txt.href = `../courses/course_list.html?place=${learning_classes[i]}`;
                txt.innerHTML = learning_classes_fa[i];
                option.id = learning_classes[i];
                option.appendChild(txt);
                father_element.appendChild(option);
            }
            all.style.transform = "translateY(0)";
            all.style.transition = "transform 400ms";
            check_list = true;
        })
        $("#bag_icon").mouseenter(function () {
            document.getElementById("bag_preview").style.transform = "translateY(0)";
            secound_header_list_back();
        })
        $("#mid").mouseenter(function () {
            document.getElementById("bag_preview").style.transform = "translateY(-500px)";
        })
        $(".middle_header").mouseenter(function () {
            document.getElementById("bag_preview").style.transform = "translateY(-500px)";
        })
        if (check_list == true) {
            $("#secound-header-list").mouseenter(function () {
                all.style.transform = "translateY(0)";
                all.style.transition = "transform 400ms";
            }).mouseleave(secound_header_list_back);
            $("#mid").mouseenter(secound_header_list_back);
            $("#hiden_contact").mouseenter(secound_header_list_back);
            $("#web-name").mouseenter(secound_header_list_back);
        }
    });
});
function secound_header_list_back() {
    if (check_list == true) {
        var all = document.getElementById("secound-header-list");
        var father_element = document.getElementById("list");
        all.style.transform = "translateY(-300px)";
        all.style.transition = "200ms";
        father_element.innerHTML = '';
        clear_underline();
    }
}
function create_underline(id) {
    clear_underline();
    titr = document.getElementById(id);
    titr.style.borderBottom = "2px solid black";
    titr.style.paddingBottom = "0.6rem";
    var father_element = document.getElementById("list");
    father_element.innerHTML = '';
}
function clear_underline() {
    var titr = [
        document.getElementById("Painting"),
        document.getElementById("Pottery"),
        document.getElementById("Sculpture"),
        document.getElementById("Learning"),
        document.getElementById("Sculpture")
    ]
    for (var i = 0; i < titr.length; i++) {
        titr[i].style.borderBottom = "0px solid black";
        titr[i].style.paddingBottom = "0rem";
    }
}
//---- register form check
function add_member() {
    const email = document.forms["signin"]["email"].value;
    const password = document.forms["signin"]["password"].value;
    const username = document.forms["signin"]["username"].value;
    const phone = document.forms["signin"]["phone"].value;
    const gender = document.forms["signin"]["gender"].value;
    const birth = document.forms["signin"]["birth"].value;
    if (!email || !password || !username || !phone) {
        window.scroll(0, 0);
        let text = "شما باید همه ی قسمت ها را کامل کنید !";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        return false;
    } else if (document.forms["signin"]["password-check"].value != password) {
        window.scroll(0, 0);
        let text = "رمز های وارد شده یکسان نمی باشد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        return false;
    } else if (password.length < 6) {
        window.scroll(0, 0);
        let text = "رمز عبور باید حداقل 6 حرف باشد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        return false;
    } else if (phone.length != 11) {
        window.scroll(0, 0);
        let text = "شماره وارد شده معتبر نمی باشد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        return false;
    } else {
        let body = {
            "email": email,
            "password": password,
            "username": username,
            "phone": phone,
            "gender": gender,
            "birth": birth,
        }
        axios.post("http://localhost:3000/api/register", body).then(res => {
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.removeItem('setupTime');
            localStorage.setItem('setupTime', new Date().getDay());
            window.location.assign(home_pg_link);
            return false;
        }).catch(err => {
            console.log(err);
            window.scroll(0, 0);
            let text = "این شماره /ایمیل/نام کاربری قبلا در سیستم ثبت شده !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
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
        let text = "شما باید همه ی قسمت ها را کامل کنید !";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else if (password.length < 6) {
        window.scroll(0, 0);
        let text = "رمز عبور باید حداقل 6 حرف باشد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else {
        axios.post("http://localhost:3000/api/login", { username, password }).then(res => {
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.removeItem('setupTime');
            localStorage.setItem('setupTime', new Date().getDay());
            window.location.assign(home_pg_link);
        }).catch(err => {
            window.scroll(0, 0);
            let text = "کاربری با این اطلاعات یافت نشد .";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        });
    }
}
function check_loged() {
    if (localStorage.getItem("token")) {
        window.location.assign(home_pg_link);
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
    var language = document.getElementById("lang");
    var persian = document.getElementById("persian");
    var english = document.getElementById("english");
    var chineese = document.getElementById("chineese");
    if (persian.checked) {
        language.innerHTML = "زبان : فارسی";
        lang_list_close();
    } else if (english.checked) {
        window.location.href = '#';
        lang_list_close();
    } else if (chineese.checked) {
        window.location.href = '#';
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
        document.getElementById("profile").href = "./register.html";
        document.getElementById("profile").innerHTML = "<h3> ثبت نام / ورود  </h3>";
    }
}
let sended_code, forgetPassPhone, forgetPasswordProj = 0;
function forget_password() {
    const information = document.getElementById("information");
    const label = document.getElementsByTagName("label")[3];
    const user_phone = document.getElementsByTagName("input")[3];
    if (forgetPasswordProj == 0) {
        forgetPassPhone = user_phone.value;
        if (user_phone.value.length != 11) {
            window.scroll(0, 0);
            let text = "شماره وارد شده معتبر نمی باشد";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            return false;
        }
        axios.post("http://localhost:3000/api/forgetPassword", { phone: user_phone.value }, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            sended_code = res.data.code;
            information.innerHTML = "کد ارسال شده در این قسمت وارد کنید :";
            label.innerHTML = "";
            user_phone.value = "";
            user_phone.placeholder = "_ _ _ _";
            forgetPasswordProj = 1;
            console.log(sended_code);
        }).catch(err => {
            const text = "هیچ حسابی با این شماره ثبت نشده است";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        });
    } else if (forgetPasswordProj == 1) {
        const member_code = document.getElementsByTagName("input")[3];
        if (member_code.value == sended_code) {
            information.innerHTML = "رمز جدید را وارد کنید :";
            member_code.value = "";
            member_code.placeholder = "رمز جدید";
            forgetPasswordProj = 2;
        } else {
            const text = "مقدار وارد شده اشتباه است !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        }

    } else if (forgetPasswordProj == 2) {
        const new_password = document.getElementsByTagName("input")[3].value;
        console.log(forgetPassPhone);
        if (!new_password) {
            const text = "رمز عبور خود را وارد کنید !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else if (new_password.length < 6) {
            const text = "رمز عبور باید بیشتر از 6 حرف باشد";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else {
            axios.put("http://localhost:3000/api/newPassword", {
                password: new_password,
                phone: forgetPassPhone,
            }).then(res => {
                window.location.href = "./register.html";
            }).catch(err => {
                const text = "ارسال داده با خطا مواجه شد !";
                call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            });
        }

    }
}
//----------------------- profile page
function load_profile_data() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign(home_pg_link);
    } else {
        axios.get(`http://localhost:3000/api/profile/detail`, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const Data = {
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                username: res.data.username,
                email: res.data.email,
                gender: res.data.gender,
                phone: res.data.phone,
                address: res.data.address,
                birth: res.data.birth,
            }

            if (Data.first_name)
                document.forms["member-detail"]["first-name"].value = res.data.first_name;
            if (Data.last_name)
                document.forms["member-detail"]["last-name"].value = res.data.last_name;
            if (Data.username) {
                document.getElementById("username").innerHTML = res.data.username;
                document.forms["member-detail"]["username"].value = res.data.username;
            }
            if (Data.email)
                document.forms["member-detail"]["email"].value = res.data.email;
            if (Data.gender)
                document.forms["member-detail"]["gender"].value = res.data.gender;
            if (Data.phone)
                document.forms["member-detail"]["phone"].value = res.data.phone;
            if (Data.address)
                document.forms["member-detail"]["address"].innerHTML = res.data.address;
            if (Data.birth)
                document.forms["member-detail"]["birth"].value = res.data.birth;
        }).catch(err => {
            window.location.assign(home_pg_link);
        });
    }

}
function edit_profile() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign(home_pg_link);
    } else {
        const info = {
            first_name: document.forms["member-detail"]["first-name"].value,
            last_name: document.forms["member-detail"]["last-name"].value,
            username: document.forms["member-detail"]["username"].value,
            email: document.forms["member-detail"]["email"].value,
            gender: document.forms["member-detail"]["gender"].value,
            phone: document.forms["member-detail"]["phone"].value,
            address: document.getElementById("address").value,
            birth: document.forms["member-detail"]["birth"].value,
        }
        if (!info.username || !info.email || !info.phone) {
            const text = "نام کاربری ، ایمیل و شماره الزامی است";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            load_profile_data();
        }
        axios.put("http://localhost:3000/api/profile/edit", info, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        })
            .then(res => {
                load_profile_data();
                const text = "با موفقیت زخیره شد";
                call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");

            }).catch(err => {
                load_profile_data();
                const text = "نام کاربری / شماره / ایمیل تکراری می باشد";
                call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            });
    }

}
function exit_req() {
    if (confirm("میخواهید از حساب کاربری خود خارج شوید ؟")) {
        localStorage.removeItem("token");
        localStorage.removeItem('basket');
        window.location.assign(home_pg_link);
    }
}
function check_role() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign(home_pg_link);
    } else {
        axios.get(`http://localhost:3000/api/profile/detail`, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const role = res.data.role;
            if (role == "admin") {
                const revers = document.getElementById("admin_option");
                revers.style.display = "block";
            } else {
                const revers = document.getElementById("admin_option");
                revers.style.display = "none";
            }
        }).catch(err => {
            const revers = document.getElementById("admin_option");
            revers.style.display = "none";
        });
    }
}
function change_password() {
    let current = document.getElementById("current-password").value;
    let new_password = document.getElementById("new-password").value;
    let check_password = document.getElementById("check-password").value;
    if (!new_password || !current || !check_password) {
        const text = "شما باید همه ی گزینه هارا پر کنید";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else if (new_password != check_password) {
        const text = "رمز های وارد شده مشابه نیست";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else if (new_password.length < 6) {
        const text = "رمز وارد شده باید حداقل 6 حرف باشد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else {
        axios.put("http://localhost:3000/api/profile/changePassword", { new_password, current }, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const text = "با موفقیت زخیره شد";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
            document.getElementById("current-password").value = "";
            document.getElementById("new-password").value = "";
            document.getElementById("check-password").value = "";
        }).catch(err => {
            const text = "رمز وارد شده اشتباه است";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        });
    }
}
function member_help_requests() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/profile/help_request_list", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((item, index) => {
                let money_color = "rgb(245 93 93 / 92%)";
                let status_color = "rgb(255 152 92 / 92%)";
                if (item.money_status == "پرداخت شده") {
                    money_color = "rgb(79 255 85 / 92%)";
                }
                if (item.status == "انجام شده") {
                    status_color = "rgb(79 255 85 / 92%)";
                }
                var tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${item.create_date}</td>
                <td>${item.final_date}</td>
                <td style="background : ${status_color}">${item.status}</td>
                <td style="background : ${money_color}">${item.money_status}</td>
                <td>${item.info}</td>`
                father.appendChild(tr);
            });
        } else {
            document.getElementsByTagName("main")[0].innerHTML = `
            <h4 id="empty">شما هیچ درخواستی ثبت نکردید</h4>
            `;
        }

    }).catch(err => {
        window.location.assign(home_pg_link);
    });
}
function load_oreder() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/profile/orders", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((item, index) => {
                let status_color = "rgb(255 152 92 / 92%)";
                if (item.status == "انجام شده") {
                    status_color = "rgb(79 255 85 / 92%)";
                }
                var tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.refID}</td>
                <td>${item.buyer_name}</td>
                <td>${item.total_price} تومان</td>
                <td>${item.date}</td>
                <td style="background : ${status_color}">${item.status}</td>
                <td><button id="detail_button" onclick="order_detail('${item._id}')">مشاهده جزئیات</button></td>`
                father.appendChild(tr);
            });
        } else {
            document.getElementsByTagName("main")[0].innerHTML = `
            <h4 id="empty">شما هیچ درخواستی ثبت نکردید</h4>
            `;
        }

    }).catch(err => {
        window.location.assign(home_pg_link);
    });
}
function order_detail(id) {
    document.getElementsByTagName("table")[0].style.display = "none";
    document.getElementById("orderList_header").style.display = "none";
    document.getElementById("orderPage").style.display = "block";
    axios.get("http://localhost:3000/api/profile/orders/" + id, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        document.getElementById("F&Lname").innerHTML = res.data.name;
        document.getElementById("send_address").innerHTML = res.data.address;
        document.getElementById("post_code").innerHTML = res.data.post_code;
        document.getElementById("send_money").innerHTML = res.data.shipping_cost + " تومان";
        document.getElementById("offer").innerHTML = res.data.offer + " تومان";
        document.getElementById("final_total").innerHTML = res.data.total_price + " تومان";
        document.getElementById("refID").innerHTML = res.data.refID;
        document.getElementById("date").innerHTML = res.data.date;
        document.getElementById("status").innerHTML = res.data.status;
        document.getElementById("items_total").innerHTML = (res.data.total_price - res.data.shipping_cost - res.data.offer) + " تومان";
        document.getElementById("object_info").innerHTML = `
        <h3>محصولات سفارش داده شده </h3>  
        ` ;
        res.data.items.map((item) => {
            const item_box = document.createElement("div");
            item_box.classList.add("object_box");
            const array = item.picture.split("\\");
            const picture = array[3];
            let type, Class;
            switch (item.type) {
                case "painting":
                    type = "نقاشی";
                    for (var i = 0; i < painting_art.length; i++) {
                        if (item.class == painting_art[i]) {
                            Class = painting_art_fa[i];
                            break;
                        }
                    }
                    break;
                case "pottery":
                    type = "سفال";
                    for (var i = 0; i < pottery_art.length; i++) {
                        if (item.class == pottery_art[i]) {
                            Class = pottery_art_fa[i];
                            break;
                        }
                    }
                    break;
                case "sculpture":
                    type = "مجسمه";
                    for (var i = 0; i < sculpture_art.length; i++) {
                        if (item.class == sculpture_art[i]) {
                            Class = sculpture_art_fa[i];
                            break;
                        }
                    }
                    break;
            }
            item_box.innerHTML = `
                    <div class="basket_object_info">
                        <div class="object_picture" style="background-image : url('../public/image/${picture}')"></div>
                        <div class="objectDetail">
                            <h4 class="object_name">${item.name}</h4>
                            <h4 class="object_type">دسته بندی : ${type}</h4>
                            <h4 class="object_class">سبک : ${Class}</h4>
                            <h4 class="object_shapes">ابعاد : ${item.x}x${item.y}</h4>
                        </div>
                    </div>
                    <h4 class="object_price">${item.price}</h4>
                    ` ;
            document.getElementById("object_info").appendChild(item_box);
        })
    }).catch(err => {
        const text = "ارسال اطلاعات با خطا مواجه شد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    });
}
function backToOrders() {
    document.getElementsByTagName("table")[0].style.display = "table";
    document.getElementById("orderPage").style.display = "none";
    document.getElementById("orderList_header").style.display = "block";
}
//------------------------ help request page
function help_request_data() {
    const id = localStorage.getItem("token");
    if (id) {
        axios.get(`http://localhost:3000/api/requestData`, {
            headers: {
                'x-auth-token': id
            }
        }).then(res => {
            document.getElementById("request_phone").value = res.data.phone;
            document.getElementById("request_name").value = res.data.name;
        }).catch(err => {
            console.log(err);
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
        axios.post(`http://localhost:3000/api/sendRequest`, body, {
            headers: {
                'x-auth-token': id
            }
        }).then(res => {
            const text = "درخواست شما با موفقیت ارسال شد";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
            window.location.href = "./profileView/help_request.html"
        }).catch(err => {
            console.log(err);
            const text = "شما یک درخواست باز دارید ، برای مشاهده ، به قسمت درخواست ها در پروفایل بروید ";
            call_cs_popup(text, 5000, "black", "rgba(255, 38, 38, 0.59)");
        });
    } else {
        const text = "برای ارسال درخواست باید ثبت نام کنید";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    }
}
//------------------------ type of arts
const painting_art_fa = [
    "همه"
    , "رئالیسم (واقع گرایی)"
    , "امپرسیونیسم (برداشت گرایی)"
    , "پست-امپرسیونیسم"
    , "نئوامپرسیونیسم"
    , "اکسپرسیونیسم"
    , "اکپرسیونیسم انتزاعی"
    , "کوبیسم (حجم گری)"
    , "فوتوریسم"
    , "ورتیسیسم"
    , "رومانتیسیسم"
    , "پرسیژنیسم"
    , "مینی‌مالیسم"
    , "سورئالیسم"
    , "گرافیتی"
    , "آپ آرت"
    , "باربیزون"
    , "فتورئالیسم"
    , "تونالیسم"
    , "باروك"
    , "استاکیسم"
    , "آبستره (انتزاعی)"
    , "كنستراكتیویسم"
    , "روکوکو"
    , "Mysore"
    , "مینیاتور ایرانی"
    , "مینیاتور عثمانی"
    , "مدرنیسم (نوگرایی)"
    , "هنر ابتدایی"
    , "پست مدرنیسم (فرا نوین)"
    , "آوانگارد"
    , "ساختار گرایی"
    , "کتاره سخت"
    , "پوینتولیسم"
    , "آبستره اکسپرسیونیسم"
    , "دادا و سوررئالیسم"
    , "سمبولیسم و آرنوو"
    , "نئوکلا سی سیسم"
    , "منریسم"
    , "کلا سیسیسم"
    , "دادائیسم"];
const painting_art = [
    "all"
    , "realism"
    , "impressionism"
    , "post_impressionism"
    , "neo_impressionism"
    , "expressionism"
    , "abstract_expressionism"
    , "cubism"
    , "futurism"
    , "verticism"
    , "romanticism"
    , "persigenism"
    , "minimalism"
    , "surrealism"
    , "graffiti"
    , "up_art"
    , "barbizon"
    , "photorealism"
    , "tunalism"
    , "baroque"
    , "stakism"
    , "abstract"
    , "constructivism"
    , "rococo"
    , "mysore"
    , "iranian_miniature"
    , "ottoman_miniature"
    , "modernism"
    , "elementary_art"
    , "postmodernism"
    , "avant_garde"
    , "structuralism"
    , "hard_cat"
    , "pointolism"
    , "abstract_expressionism"
    , "dada_and_surrealism"
    , "symbolism_and_arnaud"
    , "nucleic_system"
    , "monerism"
    , "totalism"
    , "dadaism"]
const pottery_art_fa = ["همه"
    , "نقاشی روی سفال با لعاب مخصوص"
    , "رنگ‌آمیزی با استفاده از توری"
    , "نقاشی روی سرامیک با حباب"
    , "رنگ‌آمیزی با تکنیک ماندالا"
    , "نقاشی فلوید آرت یا آبستره رزینی"
    , "نقاشی روی سفال به روش رنگ پاشی"
    , "نقاشی با استفاده از توری ابریشمی"
    , "نقاشی با استفاده از نوار چسب"
    , "نقاشی روی سفال با کاغذ رسم"
    , "رنگ‌آمیزی با استفاده از اسفنج"
    , "نقاشی زیر لعاب"
    , "نقاشی آکریلیک"];
const pottery_art = ["all"
    , "special-glaze"
    , "lace"
    , "bubbles"
    , "mandala"
    , "resin"
    , "spray"
    , "silk-mesh"
    , "adhesive-tape"
    , "paper"
    , "sponge"
    , "under-glaze"
    , "acrylic"];
const sculpture_art_fa = ["همه"
    , "کوبیسم"
    , "انتزاعی هندسی"
    , "سوپرماتیسم"
    , "سازه"
    , "دادائیسم"
    , "سورئالیسم"
    , "فوتوریسم"
    , "اکسپرسیونیسم انتزاعی"
    , "پاپ آرت"
    , "مینیمالیسم و هنر مفهومی"];
const sculpture_art = ["all"
    , "cubism"
    , "geometric_abstract"
    , "supermatism"
    , "structure"
    , "dadaism"
    , "surrealism"
    , "futurism"
    , "abstract_expressionism"
    , "pop"
    , "minimalism_and_conceptual"];
let painting_sort = "", pottery_sort = "", sculpture_sort = "";
//---------------------- sort list functions
var sort_option = [
    "expensive",
    "cheapest",
    "bestselling",
    "news"
]
var sort_option_fa = [
    "گرانترین",
    "ارزان ترین",
    "پرفروش ترین",
    "تازه ها"
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
        header.innerHTML = sort_option_fa[i];
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
    else if (mode == "pottery")
        load_pottery_item();
}
//----------------------- painting page type list functions
function create_paint_list() {
    var father = document.getElementById("painting-list");
    for (var i = 0; i < painting_art.length; i++) {
        var option = document.createElement("li");
        option.id = painting_art[i];
        var pointer = document.createElement("div");
        pointer.className = "pointer";
        option.appendChild(pointer);
        var header = document.createElement("h4");
        header.innerHTML = painting_art_fa[i];
        option.appendChild(header);
        father.appendChild(option);
        option.addEventListener("click", function () {
            painting_type_pointer(this.id);
        }, false)
    }
    const homeTypeSelected = localStorage.getItem("homeTypeSelected");
    if (homeTypeSelected) {
        painting_type_pointer(homeTypeSelected);
        localStorage.removeItem("homeTypeSelected");
    }
    else
        painting_type_pointer("all");

}
function painting_type_pointer(element) {
    var pointer = document.getElementsByClassName("pointer");
    painting_sort = element;
    for (var i = 0; i < 40; i++) {
        if (element == painting_art[i]) {
            pointer[i].style.display = "block";
            continue;
        }
        pointer[i].style.display = "none";
    }
    load_paint_item();
}
//----------------------- pottery page type list functions
function create_pottery_list() {
    var father = document.getElementById("pottry-list");
    for (var i = 0; i < pottery_art.length; i++) {
        var option = document.createElement("li");
        option.id = pottery_art[i];
        var pointer = document.createElement("div");
        pointer.className = "pointer";
        option.appendChild(pointer);
        var header = document.createElement("h4");
        header.innerHTML = pottery_art_fa[i];
        option.appendChild(header);
        father.appendChild(option);
        option.addEventListener("click", function () {
            pottery_type_pointer(this.id);
        }, false)
    }
    const homeTypeSelected = localStorage.getItem("homeTypeSelected");
    if (homeTypeSelected) {
        pottery_type_pointer(homeTypeSelected);
        localStorage.removeItem("homeTypeSelected");
    }
    else
        pottery_type_pointer("all");
}
function pottery_type_pointer(element) {
    pottery_sort = element;
    var pointer = document.getElementsByClassName("pointer");
    for (var i = 0; i < pottery_art.length; i++) {
        if (element == pottery_art[i]) {
            pointer[i].style.display = "block";
            continue;
        }
        pointer[i].style.display = "none";
    }
    load_pottery_item();
}
//------------------------- sculpturepage type list functions
function create_sculpture_list() {
    var father = document.getElementById("sculpture-list");
    for (var i = 0; i < sculpture_art.length; i++) {
        var option = document.createElement("li");
        option.id = sculpture_art[i];
        var pointer = document.createElement("div");
        pointer.className = "pointer";
        option.appendChild(pointer);
        var header = document.createElement("h4");
        header.innerHTML = sculpture_art_fa[i];
        option.appendChild(header);
        father.appendChild(option);
        option.addEventListener("click", function () {
            sculpture_type_pointer(this.id);
        }, false)
    }
    const homeTypeSelected = localStorage.getItem("homeTypeSelected");
    if (homeTypeSelected) {
        sculpture_type_pointer(homeTypeSelected);
        localStorage.removeItem("homeTypeSelected");
    }
    else
        sculpture_type_pointer("all");
}
function sculpture_type_pointer(element) {
    sculpture_sort = element;
    var pointer = document.getElementsByClassName("pointer");
    for (var i = 0; i < sculpture_art.length; i++) {
        if (element == sculpture_art[i]) {
            pointer[i].style.display = "block";
            continue;
        }
        pointer[i].style.display = "none";
    }
    load_sculpture_item();
}
//------------------------ shop
function load_paint_item() {
    load_item("painting", painting_sort, item_sort);
}
function load_pottery_item() {
    load_item("pottery", pottery_sort, item_sort);
}
function load_sculpture_item() {
    load_item("sculpture", sculpture_sort, item_sort);
}
function load_item(mode, body, sort) {
    if (body == "all") {
        document.getElementById("ware").innerHTML = "";
        axios.post("http://localhost:3000/api/items", { type: mode })
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
                    <h3 id="not_founded">کالایی یافت نشد</h3>
                    ` ;
                }
            }).catch(err => {
                console.log(err.message);
            });
    } else {
        axios.post("http://localhost:3000/api/sorted_items", { type: mode, class: body }).then(res => {
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
                    <h3 id="not_founded">کالایی یافت نشد</h3>
                    ` ;
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

}
function create_shop_item(pic, name, price, id) {
    var father = document.getElementById("ware");
    //--- picture
    var box_picture = document.createElement("div");
    box_picture.className = "item-picture";
    const array = pic.split("\\");
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
    box_price_text.innerHTML = price + " تومان";
    box_price.appendChild(box_price_text);
    //--- create box item
    var box = document.createElement("a");
    box.className = "items";
    box.href = `./item_detail.html?place=${id}`;
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
            case "pottery":
                load_pottery_item();
                break;
            case "sculpture":
                load_sculpture_item();
                break;
        }
    } else {
        document.getElementById("ware").innerHTML = "";
        const search_box = document.getElementById("wanted");
        let result = search_box.value;
        switch (type) {
            case "paint":
                for (var i = 0; i < painting_art.length; i++) {
                    if (result == painting_art_fa[i]) {
                        result = painting_art[i];
                        break;
                    }
                }
                break;
            case "pottery":
                for (var i = 0; i < pottery_art.length; i++) {
                    if (result == pottery_art_fa[i]) {
                        result = pottery_art[i];
                        break;
                    }
                }
                break;
            case "sculpture":
                for (var i = 0; i < sculpture_art.length; i++) {
                    if (result == sculpture_art_fa[i]) {
                        result = sculpture_art[i];
                        break;
                    }
                }
                break;
        }
        axios.post("http://localhost:3000/api/admin/findItem", { wanted: result }, {
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
                <h3 id="not_founded">کالایی یافت نشد</h3>
                ` ;
            }
        }).catch(err => {

        });
    }
}
function item_page() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    axios.get("http://localhost:3000/api/items/" + placeID).then(res => {
        document.getElementById("item_name").innerHTML = res.data.name;
        let type, Class;
        switch (res.data.type) {
            case "painting":
                type = "نقاشی";
                for (var i = 0; i < painting_art.length; i++) {
                    if (res.data.class == painting_art[i]) {
                        Class = painting_art_fa[i];
                        break;
                    }
                }
                break;
            case "pottery":
                type = "سفال";
                for (var i = 0; i < pottery_art.length; i++) {
                    if (res.data.class == pottery_art[i]) {
                        Class = pottery_art_fa[i];
                        break;
                    }
                }
                break;
            case "sculpture":
                type = "مجسمه";
                for (var i = 0; i < sculpture_art.length; i++) {
                    if (res.data.class == sculpture_art[i]) {
                        Class = sculpture_art_fa[i];
                        break;
                    }
                }
                break;
        }
        document.getElementsByClassName("item_data")[0].innerHTML = type;
        document.getElementsByClassName("item_data")[1].innerHTML = Class;
        document.getElementsByClassName("item_data")[2].innerHTML = res.data.x;
        document.getElementsByClassName("item_data")[3].innerHTML = res.data.y;
        document.getElementsByClassName("item_data")[4].innerHTML = res.data.info;
        document.getElementById("Price").innerHTML = res.data.price + " تومان";
        let picture = res.data.picture;
        const array = picture.split("\\");
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
                        <p class="sended_date">ارسال شده در : ${comment.create_date}</p>
                        <div class="comment_txt_box">${comment.text}</div>
                    ` ;
                    father.appendChild(comment_box);
                }
            });
            if (res.data.length > 9) {
                const button = document.createElement("button");
                button.innerHTML = "مشاهده نظرات بیشتر ..."
                father.appendChild(button);
            }
        } else {
            console.log("no comment")
        }


    }).catch(err => {
        let text = "انتقال دیتا با خطا مواجه شده است";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    });
}
function add_comment() {
    const body = {
        name: document.getElementById("name").value,
        text: document.getElementById("comment_txt").value,
    }
    if (!body.name || !body.text) {
        let text = "شما باید نام و نظر خود را وارد کنید";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else {
        const placeID = new URLSearchParams(window.location.search).get("place");
        axios.post("http://localhost:3000/api/items/addComment/" + placeID, body).then(res => {
            const text = "نظر شما با موفقیت ثبت شد و بعد از بررسی توسط ادمین نمایش داده می شود";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
            document.getElementById("name").value = "";
            document.getElementById("comment_txt").value = "";
        }).catch(err => {
            let text = "انتقال دیتا با خطا مواجه شده است";
            call_cs_popup(text, 3000, "black", "rgba(255, 38, 38, 0.59)");
        });
    }

}
function load_intro_items() {
    axios.post("http://localhost:3000/api/items").then(res => {
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
            const array = pic.split("\\");
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
            box_price_text.innerHTML = price + " تومان";
            box_price.appendChild(box_price_text);
            //--- create box item
            var box = document.createElement("a");
            box.className = "items";
            box.href = `./item_detail.html?place=${id}`;
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
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else {
            axios.post("http://localhost:3000/api/basket/checkOut", body, {
                headers: {
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then(res => {
                window.location.assign(res.data);
            }).catch(err => {
                const text = "ارسال اطلاعات با خطا مواجه شده است";
                call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            });
        }
    }
}
function bill_result() {
    const mode = new URLSearchParams(window.location.search).get("for");
    const Authority = new URLSearchParams(window.location.search).get("Authority");
    const Status = new URLSearchParams(window.location.search).get("Status");
    if (mode && mode == "course") {
        axios.get("http://localhost:3000/api/course/verification?Authority=" + Authority + "&Status=" + Status, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data.succes == true) {
                document.getElementById("pay_status").innerHTML = "از خرید شما متشکریم";
                document.getElementById("payedStatus").innerHTML = "موفق";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-happy-100.png')"
                document.getElementById("paymentCode").innerHTML = res.data.refID;
                document.getElementById("gotoprofile").href = "../profileView/orders.html";
                document.getElementById("gotoprofile_button").innerHTML = "مشاهده جزئیات";
                document.getElementById("gotoprofile").href = "./profile/my_courses.html";
            } else {
                document.getElementById("pay_status").innerHTML = "پرداخت با خطا مواجه شد";
                document.getElementById("payedStatus").innerHTML = "ناموفق";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-sad-100.png')"
                document.getElementsByClassName("textLine")[3].innerHTML = "";
                document.getElementById("gotoprofile_button").innerHTML = "بازگشت به کلاس ها ";
                document.getElementById("gotoprofile").href = "./learning_classes.html";
            }
            document.getElementById("memberName").innerHTML = res.data.buyer_name;
            document.getElementById("payed").innerHTML = res.data.total_price + " تومان";

        }).catch(err => {
            const text = "ارسال اطلاعات با خطا مواجه شده است";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        });
    } else {
        axios.get("http://localhost:3000/api/payment/verification?Authority=" + Authority + "&Status=" + Status, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data.succes == true) {
                document.getElementById("pay_status").innerHTML = "از خرید شما متشکریم";
                document.getElementById("payedStatus").innerHTML = "موفق";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-happy-100.png')"
                document.getElementById("paymentCode").innerHTML = res.data.refID;
                document.getElementById("gotoprofile").href = "../profileView/orders.html";
                localStorage.removeItem("basket");
                load_basket();
            } else {
                document.getElementById("pay_status").innerHTML = "پرداخت با خطا مواجه شد";
                document.getElementById("payedStatus").innerHTML = "ناموفق";
                document.getElementById("payment_emoji").style.backgroundImage = "url('../public/images/icons8-sad-100.png')"
                document.getElementsByClassName("textLine")[3].innerHTML = "";
                document.getElementById("gotoprofile_button").innerHTML = "بازگشت به سبد خرید";
                document.getElementById("gotoprofile").href = "./bag.html";
            }
            document.getElementById("memberName").innerHTML = res.data.buyer_name;
            document.getElementById("payed").innerHTML = res.data.total_price + " تومان";

        }).catch(err => {
            const text = "ارسال اطلاعات با خطا مواجه شده است";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
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
            document.getElementById("object_info").innerHTML = `<h4 style="padding: 5%; text-align: center; font-size: 1.3rem;">سبد خرید شما خالی است</h4>`;
            document.getElementsByClassName("total_money")[0].innerHTML = "0 تومان";
        } else {
            document.getElementsByClassName("total_money")[0].innerHTML = "0 تومان";
            document.getElementById("Data").innerHTML = `<h4 style="padding: 5%; text-align: center; font-size: 1.3rem;">سبد خرید شما خالی است</h4>`;
        }
    } else if (basket_item) {
        basket_item.map((item) => {
            axios.get("http://localhost:3000/api/items/" + item).then(res => {
                let type, Class;
                switch (res.data.type) {
                    case "painting":
                        type = "نقاشی";
                        for (var i = 0; i < painting_art.length; i++) {
                            if (res.data.class == painting_art[i]) {
                                Class = painting_art_fa[i];
                                break;
                            }
                        }
                        break;
                    case "pottery":
                        type = "سفال";
                        for (var i = 0; i < pottery_art.length; i++) {
                            if (res.data.class == pottery_art[i]) {
                                Class = pottery_art_fa[i];
                                break;
                            }
                        }
                        break;
                    case "sculpture":
                        type = "مجسمه";
                        for (var i = 0; i < sculpture_art.length; i++) {
                            if (res.data.class == sculpture_art[i]) {
                                Class = sculpture_art_fa[i];
                                break;
                            }
                        }
                        break;
                }
                total += parseInt(res.data.price);
                if (mode != "page") {
                    const item_box = document.createElement("div");
                    item_box.classList.add("basket_item_box");
                    document.getElementById("item_count").innerHTML = "سبد خرید : " + basket_item.length;
                    document.getElementsByClassName("total_money")[0].innerHTML = total + " تومان";
                    const array = res.data.picture.split("\\");
                    const picture = array[3];
                    item_box.innerHTML = `
                    <div class="basket_item_info">
                        <h4 class="box_name">${res.data.name}</h4>
                        <h4 class="box_type">دسته بندی : ${type}</h4>
                        <h4 class="box_class">سبک : ${Class}</h4>
                    </div>
                    <div class="box_picture" style="background-image : url('../public/image/${picture}')"></div>
                    <h4 class="box_price">${res.data.price} تومان</h4>
                    ` ;
                    document.getElementById("Data").appendChild(item_box);
                } else {
                    const item_box = document.createElement("div");
                    item_box.classList.add("object_box");
                    document.getElementById("items_total").innerHTML = total + " تومان";
                    const array = res.data.picture.split("\\");
                    const picture = array[3];
                    item_box.innerHTML = `
                    <div class="basket_object_info">
                        <div class="object_picture" style="background-image : url('../public/image/${picture}')"></div>
                        <div class="objectDetail">
                            <h4 class="object_name">${res.data.name}</h4>
                            <h4 class="object_type">دسته بندی : ${type}</h4>
                            <h4 class="object_class">سبک : ${Class}</h4>
                            <h4 class="object_shapes">ابعاد : ${res.data.x}x${res.data.y}</h4>
                        </div>
                    </div>
                    <div class="remove_object" onclick = "remove_basket('${item}')">
                        <div class="close"></div>
                        <h3>حذف</h3>
                    </div>
                    <h4 class="object_price">${res.data.price} تومان</h4>
                    ` ;
                    document.getElementById("object_info").appendChild(item_box);
                    load_factor("none")
                }
            }).catch(err => {
                console.log(err);
            });
        });
        if (mode == "page") {
            const token = localStorage.getItem('token');
            if (!token) {
                document.getElementById("checkout").innerHTML = "ورود / ثبت نام";
                document.getElementById("checkout").onclick = () => { window.location.href = "./register.html"; };
            } else {
                document.getElementById("checkout").innerHTML = "پرداخت";
                document.getElementById("checkout").onclick = () => { check_out() };
                document.getElementById("object_info").innerHTML = "";
                axios.get(`http://localhost:3000/api/profile/detail`, {
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
        const text = "با موفقیت به شبد خرید اضافه شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
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
            const text = "شما باید کد تایید را وارد کنید";
            call_cs_popup(text, 3000, "black", "rgba(255, 38, 38, 0.59)");
            factor_offer = 0;
        }
    } else {
        axios.post("http://localhost:3000/api/payment/offer_check/" + code)
            .then(res => {
                if (res.data != 0) {
                    load_factor(parseInt(res.data));
                } else {
                    const text = "کد وارد شده معتبر نیست";
                    call_cs_popup(text, 3000, "black", "rgba(255, 38, 38, 0.59)");
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
    axios.post("http://localhost:3000/api/payment/factor", body)
        .then(res => {
            factor_transport = res.data.transport;
            if (code != "none") {
                let air = total + factor_transport;
                factor_offer = (code * air) / 100;
            }
            factor_total = (total + factor_transport) - factor_offer;
            document.getElementById("send_money").innerHTML = factor_transport + " تومان";
            document.getElementById("final_total").innerHTML = factor_total + " تومان";
            document.getElementById("offer").innerHTML = factor_offer + " تومان";
        })

}
//--------------------- notif
function call_cs_popup(text, time, color, background) {
    const notif = document.getElementById("notfication");
    notif.innerHTML = text;
    notif.style.color = color;
    notif.style.backgroundColor = background;
    notif.style.transform = "translateX(0px)";
    if (time != 0) {
        setTimeout(() => {
            notif.style.transform = "translateX(-1000px)";
        }, time);
    }
}

$(document).ready(function () {
    window.scroll(0, 0);
});

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