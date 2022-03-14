function load_profile_data() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign("/");
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
            window.location.assign("/");
        });
    }

}
function edit_profile() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign("/");
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
        window.location.assign("/");
    }
}
function check_role() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign("/");
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
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
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
        window.location.assign("/");
    });
}
function load_oreder() {
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
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
        window.location.assign("/");
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
function load_my_course() {
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
    axios.get("http://localhost:3000/api/profile/my_course", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((item, index) => {
            var tr = document.createElement("tr");
            tr.style.backgroundColor = "rgb(220,220,220)";
            //----- translate section
            let status;
            switch (item.status) {
                case "ongoing":
                    status = "در حال برگزاری";
                    break;
                case "done":
                    status = "تمام شده";
                    break;
                case "waiting":
                    status = "به زودی";
                    break;
            }
            //-------
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.length}</td>
                <td>${item.time}</td>
                <td>${status}</td>
                <td>${item.hours}</td>
                <td>${item.start_date}</td>
                <td><button class="detail_button" onclick="member_courses_detail('${item._id}')">جزئیات</button></td>`;
            let father;
            if (item.status == "ongoing")
                father = document.querySelector("#ongoing_courses tbody");
            else if (item.status == "done")
                father = document.querySelector("#done_courses tbody");
            else if (item.status == "waiting")
                father = document.querySelector("#waiting_courses tbody");
            father.appendChild(tr);
            if (document.querySelector("#ongoing_courses tbody").innerHTML == "") {
                document.querySelector("#ongoing_courses").style.display = "none";
                document.getElementById("1").style.display = "none";
            } else {
                document.querySelector("#ongoing_courses").style.display = "table";
                document.getElementById("1").style.display = "block";
            }
            if (document.querySelector("#done_courses tbody").innerHTML == "") {
                document.querySelector("#done_courses").style.display = "none";
                document.getElementById("2").style.display = "none";
            } else {
                document.querySelector("#done_courses").style.display = "table";
                document.getElementById("2").style.display = "block";
            }
            if (document.querySelector("#waiting_courses tbody").innerHTML == "") {
                document.querySelector("#waiting_courses").style.display = "none";
                document.getElementById("0").style.display = "none";
            } else {
                document.querySelector("#waiting_courses").style.display = "table";
                document.getElementById("0").style.display = "block";
            }

        });
    }).catch(err => {
        console.log(err);
    });
}
function member_courses_detail() {

}