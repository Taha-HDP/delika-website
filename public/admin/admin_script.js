//---- create new item
function add_new_item() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    const name = document.forms["item-info"]["item-name"];
    const price = document.forms["item-info"]["item-price"];
    const type = document.forms["item-info"]["item-type"];
    const art = document.forms["item-info"]["item-art"];
    const height = document.forms["item-info"]["item-height"];
    const width = document.forms["item-info"]["item-width"];
    const info = document.forms["item-info"]["item-information"];
    const image = document.getElementById("item-image");
    if (!placeID) {
        if (!name.value || !price.value || !type.value || !art.value || !height.value || !width.value || !image.files[0]) {
            const text = "شما باید قسمت های ستاره دار را پر کنید !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else {
            const body = new FormData();
            body.append("name", name.value);
            body.append("type", type.value);
            body.append("class", art.value);
            body.append("y", height.value);
            body.append("x", width.value);
            body.append("price", price.value);
            body.append("info", info.value);
            body.append("picture", image.files[0]);
            axios.post("http://localhost:3000/api/admin/add_new_item", body, {
                headers: {
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then(res => {
                const text = "کالا با موفقیت به فروشگاه اضافه شد";
                call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
                name.value = "";
                type.value = "none";
                height.value = "";
                width.value = "";
                price.value = "";
                info.value = "";
                image.files[0] = "";
                document.getElementById("uploadLabel").style.backgroundImage = "none";
                document.getElementById("uploadLabel").style.color = "black";
            }).catch(err => {
                const text = "نام وارد شده تکراری می باشد";
                call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            });
        }
    } else {
        if (!name.value || !price.value || !type.value || !art.value || !height.value || !width.value) {
            const text = "شما باید قسمت های ستاره دار را پر کنید !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else {
            if (!image.files[0]) {
                const body = {
                    name: name.value,
                    type: type.value,
                    class: art.value,
                    y: height.value,
                    x: width.value,
                    price: price.value,
                    info: info.value
                }
                axios.put("http://localhost:3000/api/admin/edit_item/" + placeID, body, {
                    headers: {
                        'x-auth-token': localStorage.getItem("token")
                    }
                }).then(res => {
                    const text = "کالا با موفقیت ویرایش شد";
                    call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
                    window.location.href = "./item_list.html";
                }).catch(err => {
                    const text = "نام وارد شده تکراری می باشد";
                    call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
                });
            } else {
                const body = new FormData();
                body.append("name", name.value);
                body.append("type", type.value);
                body.append("class", art.value);
                body.append("y", height.value);
                body.append("x", width.value);
                body.append("price", price.value);
                body.append("info", info.value);
                body.append("picture", image.files[0]);
                axios.put("http://localhost:3000/api/admin/edit_itemP/" + placeID, body, {
                    headers: {
                        'x-auth-token': localStorage.getItem("token")
                    }
                }).then(res => {
                    const text = "کالا با موفقیت ویرایش شد";
                    call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
                    window.location.href = "./item_list.html";
                }).catch(err => {
                    const text = "نام وارد شده تکراری می باشد";
                    call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
                });
            }
        }
    }
}
function typeOfArt() {
    var mode = document.forms["item-info"]["item-type"].value;
    var father_element = document.getElementById("item-art");
    father_element.innerHTML = '';
    if (mode == "painting") {
        for (var i = 1; i < 40; i++) {
            var option = document.createElement("option");
            option.innerHTML = painting_art_fa[i];
            option.value = painting_art[i];
            father_element.appendChild(option);
        }
    } else if (mode == "pottery") {
        for (var i = 1; i < 12; i++) {
            var option = document.createElement("option");
            option.innerHTML = pottery_art_fa[i];
            option.value = pottery_art[i];
            father_element.appendChild(option);
        }
    } else if (mode == "sculpture") {
        for (var i = 1; i < 10; i++) {
            var option = document.createElement("option");
            option.innerHTML = sculpture_art_fa[i];
            option.value = sculpture_art[i];
            father_element.appendChild(option);
        }
    }
}
function change_item_picture(elem) {
    var length = elem.files.length;
    if (!length) {
        return false;
    }
    changeBackground(elem);
}
function changeBackground(img) {
    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(img.files[0]);
    function imageIsLoaded(e) {
        document.getElementById("uploadLabel").style.backgroundImage = "url(" + e.target.result + ")";
        document.getElementById("uploadLabel").style.color = "rgba(0,0,0,0)";
    }
}
//---- items section
function item_list() {
    const father = document.querySelector("tbody");
    father.innerHTML = "";
    axios.get("http://localhost:3000/api/admin/items", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((item, index) => {
            var tr = document.createElement("tr");
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
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
            const href = `../item_detail.html?place=${item._id}`;
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="${href}">${item.name}</a></td>
            <td>${type}</td>
            <td>${Class}</td>
            <td>${item.price} تومان</td>
            <td>
                <button class="delete_button" onclick="delete_item('${item._id}')">حذف</button>
                <button class="info_button" onclick="gotoEditItem('${item._id}')">ویرایش</button>
                <button class="detail_button" onclick="item_detail('${item._id}')">جزئیات</button>
            </td>`
            father.appendChild(tr);
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function item_detail(id){
    document.getElementById("item-list").style.display = "none";
    document.getElementById("itemDetail").style.display = "block";
    axios.get("http://localhost:3000/api/admin/item/"+id , {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const item = res.data;
        const array = item.picture.split("\\");
        const picture = array[3];
        document.getElementById("itemDetail").innerHTML = `
        <h3 id="detail-head">جزئیات کالا</h3>
        <h3 id="back-button" onclick="backToItems()">بازگشت</h3>
        <table>
            <tbody>
                <tr>
                    <td>آی دی کالا</td>
                    <td>${item._id}</td>
                </tr>
                <tr>
                    <td>نام کالا</td>
                    <td>${item.name}</td>
                </tr>
                <tr>
                    <td>دسته بندی</td>
                    <td>${item.type}</td>
                </tr>
                <tr>
                    <td>سبک</td>
                    <td>${item.class}</td>
                </tr>
                <tr>
                    <td>طول</td>
                    <td>${item.x}</td>
                </tr>
                <tr>
                    <td>عرض</td>
                    <td>${item.y}</td>
                </tr>
                <tr>
                    <td>قیمت</td>
                    <td>${item.price}</td>
                </tr>
                <tr>
                    <td>تاریخ ساخت</td>
                    <td>${item.create_date}</td>
                </tr>
                <tr>
                    <td>تعداد فروش</td>
                    <td>${item.salesNumber}</td>
                </tr>
                <tr>
                    <td>توضیحات</td>
                    <td>${item.info}</td>
                </tr>
                <tr>
                    <td>تصویر</td>
                    <td>
                        <img src="../public/image/${picture}">
                    </td>
                </tr>
            </tbody>
        </table> ` ;
    }).catch(err => {
        window.location.assign("/");
    });
}
function backToItems() {
    document.getElementById("item-list").style.display = "block";
    document.getElementById("itemDetail").style.display = "none";
}
function delete_item(id) {

    if (confirm("آیا از این کار خود اطمینان دارید ؟")) {
        axios.delete("http://localhost:3000/api/admin/remove_item/" + id, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const text = "کالا با موفقیت حذف شد";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
            item_list();
        }).catch(err => {
            window.location.assign("/");
        });
    }
}
function gotoEditItem(id) {
    window.location.href = `./add_shoping_item.html?place=${id}`;
}
function edit_item() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    if (placeID) {
        document.getElementById("add-item").classList.remove("active");
        document.getElementById("item_lists").classList.add("active");
        document.getElementById("mid_titr").innerText = "ویرایش";
        axios.get("http://localhost:3000/api/admin/item/" + placeID, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            document.getElementById("item-name").value = res.data.name;
            document.getElementById("item-price").value = res.data.price;
            document.getElementById("item-type").value = res.data.type;
            typeOfArt();
            document.getElementById("item-art").value = res.data.class;
            document.getElementById("height").value = res.data.y;
            document.getElementById("width").value = res.data.x;
            document.getElementById("item-information").value = res.data.info;
            let picture = res.data.picture;
            const array = picture.split("\\");
            picture = array[3];
            document.getElementById("uploadLabel").style.backgroundImage = "url('../public/image/" + picture + "')";
            document.getElementById("uploadLabel").style.color = "rgba(0,0,0,0)";
            document.getElementById("submit_button").value = "ویرایش";
        }).catch(err => {
            window.location.assign("/");
        });
    }
}
function find_item() {
    const search_box = document.getElementById("wanted");
    if (search_box.value == "") {
        item_list()
    } else {
        const father = document.querySelector("tbody");
        father.innerHTML = "";
        let result = search_box.value;
        for (var i = 0; i < painting_art.length; i++) {
            if (result == painting_art_fa[i]) {
                result = painting_art[i];
                break;
            }
        }
        for (var i = 0; i < pottery_art.length; i++) {
            if (result == pottery_art_fa[i]) {
                result = pottery_art[i];
                break;
            }
        }
        for (var i = 0; i < sculpture_art.length; i++) {
            if (result == sculpture_art_fa[i]) {
                result = sculpture_art[i];
                break;
            }
        }
        axios.post("http://localhost:3000/api/admin/findItem", { wanted: result }, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data) {
                search_box.value = "";
                res.data.reverse();
                res.data.map((item, index) => {
                    var tr = document.createElement("tr");
                    if (index % 2 == 0) {
                        tr.style.backgroundColor = "rgb(200,200,200)";
                    } else {
                        tr.style.backgroundColor = "rgb(241, 241, 241)";
                    }
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
                    const href = `../item_detail.html?place=${item._id}`;
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td><a href="${href}">${item.name}</a></td>
                    <td>${type}</td>
                    <td>${Class}</td>
                    <td>${item.price} تومان</td>
                    <td>
                        <button class="delete_button" onclick="delete_item('${item._id}')">حذف</button>
                        <button class="info_button" onclick="gotoEditItem('${item._id}')">ویرایش</button>
                        <button class="detail_button" onclick="item_detail('${item._id}')">جزئیات</button>
                    </td>`
                    father.appendChild(tr);
                });
            }
        }).catch(err => {
            window.location.assign("/");
        });
    }
}
//---- auth check
function check_admin() {
    axios.get("http://localhost:3000/api/admincheck", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
    }).catch(err => {
        window.location.assign("/");
    });
}
//---- data
function admin_data() {
    axios.get("http://localhost:3000/api/admin/allData", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        document.getElementById("all-members").innerText = res.data.customers;
        document.getElementById("new-members").innerHTML = res.data.new_members;
        document.getElementById("waiting-comment").innerHTML = res.data.waiting_comments;
        //--- items section
        document.getElementById("all-items").innerText = res.data.items;
        document.getElementById("saled-items").innerHTML = res.data.saled_items;
        document.getElementById("new-saled-items").innerHTML = res.data.new_saled_items;
        document.getElementById("added-items").innerText = res.data.added_items;
        //--- request section
        document.getElementById("all-requests").innerHTML = res.data.requests;
        document.getElementById("new-requests").innerHTML = res.data.new_requests;
        document.getElementById("done-requests").innerHTML = res.data.done_requests;
        document.getElementById("waitting-requests").innerHTML = res.data.waiting_requests;

    }).catch(err => {
        window.location.assign("/");
    });
}
function site_data() {
    axios.get("http://localhost:3000/api/admin/site_setting", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        document.getElementById("siteEmail").value = res.data.email;
        document.getElementById("siteInstagram").value = res.data.instagram;
        document.getElementById("sitePhone").value = res.data.phone;
        document.getElementById("siteAdresss").value = res.data.address;
        document.getElementById("sitePhone2").value = res.data.phone_2;
        document.getElementById("siteAdresss2").value = res.data.address_2;
        document.getElementById("localTransport").value = res.data.local_transport;
        document.getElementById("globalTransprot").value = res.data.global_transport;
        document.getElementById("sitePhone3").value = res.data.phone_3;
        document.getElementById("sitePhone4").value = res.data.phone_4;
        document.getElementById("about_delika").value = res.data.about;
    }).catch(err => {
        window.location.assign("/500.html")
    })
}
function change_setting(id) {
    const body = {
        type: id,
        data: document.getElementById(id).value
    }
    axios.put("http://localhost:3000/api/admin/site_setting", body, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const text = "با موفقیت ذخیره شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
    }).catch(err => {
        const text = "ارسال داده با خطا مواجه شده است";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    });
}
function load_aside_list(active) {
    document.getElementsByTagName("aside")[0].innerHTML = `
    <h3>پنل ادمین</h3>
    <ul id="sidebar">
        <li id="aside_pannel">
            <a href="../admin/admin_pannel.html">پنل اصلی</a>
        </li>
        <li id="add-item">
            <a href="../admin/add_shoping_item.html">افزودن کالا</a>
        </li>
        <li id="item_lists">
            <a href="../admin/item_list.html">لیست محصولات</a>
        </li>
        <li id="aside_saled">
            <a href="../admin/saled_item.html">لیست کالا های فروخته شده</a>
        </li>
        <li id="aside_self_req">
            <a href="../admin/self_request.html">لیست سفارش های شخصی</a>
        </li>
        <li id="aside_helps">
            <a href="../admin/talk_request.html">لیست درخواست های مشاوره</a>
        </li>
        <li id="aside_create_class">
            <a href="../admin/create_class.html">برگزاری کلاس</a>
        </li>
        <li id="aside_class_list">
            <a href="../admin/class_list.html">لیست کلاس ها</a>
        </li>
        <li id="aside_class_payment">
            <a href="../admin/class_payment.html">لیست پرداخت کلاس ها</a>
        </li>
        <li id="aside_members">
            <a href="../admin/member_list.html">لیست کاربران</a>
        </li>
        <li id="aside_comments">
            <a href="../admin/comments.html">نظرات تایید نشده</a>
        </li>
        <li id="aside_offers">
            <a href="../admin/offer_list.html">تخفیف ها</a>
        </li>
        <li id="aside_setting">
            <a href="../admin/setting.html">تنظیمات سایت</a>
        </li>
    </ul>
    ` ;
    document.getElementById(active).classList.add("active");
}
//---- members section
function member_list() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/memberList", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((user, index) => {
            var tr = document.createElement("tr");
            let gender;
            if (user.gender == "male") {
                gender = "مرد";
            } else {
                gender = "زن";
            }
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.phone}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${gender}</td>
            <td>${user.birth}</td>
            <td>${user.purchases_number}</td>
            <td><button class="detail" onclick="member_detail('${user._id}')">جزئیات</button></td>`
            father.appendChild(tr);
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function member_detail(id) {
    document.getElementById("member-list").style.display = "none";
    document.getElementById("memberDetail").style.display = "block";
    axios.post("http://localhost:3000/api/admin/memberdetail", { id: id }, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const item = res.data;
        document.getElementById("memberDetail").innerHTML = "";
        let gender;
        if (item.gender == "male") {
            gender = "مرد";
        } else {
            gender = "زن";
        }
        document.getElementById("memberDetail").innerHTML = `
        <h3 id="detail-head">جزئیات کاربر</h3>
        <h3 id="back-button" onclick="back_detail()">بازگشت</h3>
        <table>
            <tbody>
                <tr>
                    <td class="theader" id="detail-id">آی دی</td>
                    <td>${item._id}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">نام</td>
                    <td>${item.first_name}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">نام خانوادگی</td>
                    <td>${item.last_name}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">شماره</td>
                    <td>${item.phone}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">نام کاربری</td>
                    <td>${item.username}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">ایمیل</td>
                    <td>${item.email}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">جنسیت</td>
                    <td>${gender}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">تاریخ تولد</td>
                    <td>${item.birth}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">تعداد خرید</td>
                    <td>${item.purchases_number}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">آدرس</td>
                    <td>${item.address}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">تاریخ عضویت</td>
                    <td>${item.create_date}</td>
                </tr>
                <tr>
                    <td class="theader" id="detail-id">نقش</td>
                    <td id="change_role">${item.role}</td>
                </tr>
            </tbody>
        </table> ` ;
        check_super_admin(item.role, item._id);
    }).catch(err => {
        window.location.assign("/");
    });
}
function back_detail() {
    document.getElementById("member-list").style.display = "block";
    document.getElementById("memberDetail").style.display = "none";
}
//---- self requests
function self_request_list() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/self_request_list", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((request, index) => {
            let status_color;
            switch (request.status) {
                case "checking":
                    status_color = "rgb(255 182 108 / 92%)";
                    break;
                case "creating":
                    status_color = "rgb(233 243 86 / 92%)";
                    break;
                case "sended":
                    status_color = "rgb(102 207 247 / 92%)";
                    break;
                case "done":
                    status_color = "rgb(79 255 85 / 92%)";
                    break;
            }
            var tr = document.createElement("tr");
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.type}</td>
            <td>${request.name}</td>
            <td>${request.username}</td>
            <td>${request.send_date}</td>
            <td style="background : ${status_color}">
                <select class="status_select" onchange="change_self_request('${request._id}','${index}')">
                    <option class="request_checking" value="checking">در حال بررسی</option>
                    <option class="request_creating" value="creating">در حال ساخت</option>
                    <option class="request_sended" value="sended">ارسال شده</option>
                    <option class="request_done" value="done">انجام شده</option>
                </select>
            </td>
            <td><button class="detail_button" onclick="self_request_dateil('${request._id}')">جزئیات</button></td>`;
            father.appendChild(tr);
            document.getElementsByClassName("request_" + request.status)[index].selected = true;
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function change_self_request(id, index) {
    const status = document.getElementsByClassName("status_select")[index].value;
    const body = {
        "id": id,
        "status": status,
    }
    axios.put("http://localhost:3000/api/admin/self_request_edit", body, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const text = "با موفقیت ذخیره شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
    }).catch(err => {
        const text = "ارسال داده با خطا مواجه شده است";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    });
}
function self_request_dateil(id) {
    document.getElementById("self-req").style.display = "none";
    document.getElementById("requestDetail").style.display = "block";
    axios.get("http://localhost:3000/api/admin/requestDetail/" + id, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const request = res.data;
        const array = request.picture.split("\\");
        const picture = array[3];
        document.getElementById("requestDetail").innerHTML = `
        <h3 id="detail-head">جزئیات درخواست</h3>
        <h3 id="back-button" onclick="backToRequests()">بازگشت</h3>
        <table>
            <tbody>
                <tr>
                    <td>آی دی درخواست</td>
                    <td>${request._id}</td>
                </tr>
                <tr>
                    <td>آی دی کاربر</td>
                    <td>${request.member_id}</td>
                </tr>
                <tr>
                    <td>نام خریدار</td>
                    <td>${request.name}</td>
                </tr>
                <tr>
                    <td>نام کاربری خریدار</td>
                    <td>${request.username}</td>
                </tr>
                <tr>
                    <td>شماره</td>
                    <td>${request.phone}</td>
                </tr>
                <tr>
                    <td>ایمیل</td>
                    <td>${request.email}</td>
                </tr>
                <tr>
                    <td>دسته بندی</td>
                    <td>${request.type}</td>
                </tr>
                <tr>
                    <td>طول</td>
                    <td>${request.x}</td>
                </tr>
                <tr>
                    <td>عرض</td>
                    <td>${request.y}</td>
                </tr>
                <tr>
                    <td>تاریخ ارسال</td>
                    <td>${request.send_date}</td>
                </tr>
                <tr>
                    <td>توضیحات</td>
                    <td>${request.info}</td>
                </tr>
                <tr>
                    <td>تصویر</td>
                    <td>
                        <img src="../public/image/${picture}">
                    </td>
                </tr>
            </tbody>
        </table> ` ;
    }).catch(err => {
        window.location.assign("/");
    });
}
function backToRequests() {
    document.getElementById("self-req").style.display = "block";
    document.getElementById("requestDetail").style.display = "none";
}
function find_request() {
    const father = document.querySelector("tbody");
    father.innerHTML = '';
    const search = document.getElementById("wanted").value;
    if (search == "") {
        self_request_list();
        return 0;
    }
    axios.get("http://localhost:3000/api/admin/request/" + search, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((request, index) => {
                let status_color;
                switch (request.status) {
                    case "checking":
                        status_color = "rgb(255 182 108 / 92%)";
                        break;
                    case "creating":
                        status_color = "rgb(233 243 86 / 92%)";
                        break;
                    case "sended":
                        status_color = "rgb(102 207 247 / 92%)";
                        break;
                    case "done":
                        status_color = "rgb(79 255 85 / 92%)";
                        break;
                }
                var tr = document.createElement("tr");
                if (index % 2 == 0) {
                    tr.style.backgroundColor = "rgb(200,200,200)";
                } else {
                    tr.style.backgroundColor = "rgb(241, 241, 241)";
                }
                tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${request.type}</td>
                <td>${request.name}</td>
                <td>${request.username}</td>
                <td>${request.send_date}</td>
                <td style="background : ${status_color}">
                    <select class="status_select" onchange="change_self_request('${request._id}','${index}')">
                        <option class="request_checking" value="checking">در حال بررسی</option>
                        <option class="request_creating" value="creating">در حال ساخت</option>
                        <option class="request_sended" value="sended">ارسال شده</option>
                        <option class="request_done" value="done">انجام شده</option>
                    </select>
                </td>
                <td><button class="detail_button" onclick="self_request_dateil('${request._id}')">جزئیات</button></td>`;
                father.appendChild(tr);
                document.getElementsByClassName("request_" + request.status)[index].selected = true;
            });
        }
    })
}
//---- help requests
function help_request_list() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/help_request_list", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
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
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.create_date}</td>
            <td>
                <input type="text" class="DateInput" onchange="change_help_request('${item._id}','${index}')" value="${item.final_date}">
            </td>
            <td style="background : ${status_color}">
                <select class="status_select" onchange="change_help_request('${item._id}','${index}')">
                    <option value="${item.status}" selected disabled hidden>${item.status}</option>
                    <option value="انجام شده"> انجام شده</option>
                    <option value="در حال بررسی">در حال بررسی</option>
                </select>
            </td>
            <td style="background : ${money_color}">
                <select class="money_status" onchange="change_help_request('${item._id}','${index}')">
                    <option value="${item.money_status}" selected disabled hidden>${item.money_status}</option>
                    <option value="پرداخت شده">پرداخت شده</option>
                    <option value="پرداخت نشده">پرداخت نشده</option>
                </select>
            </td>
            <td>${item.info}</td>`
            father.appendChild(tr);
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function change_help_request(id, index) {
    const final_date = document.getElementsByClassName("DateInput")[index].value;
    const status = document.getElementsByClassName("status_select")[index].value;
    const money_status = document.getElementsByClassName("money_status")[index].value;
    const body = {
        "id": id,
        "final_date": final_date,
        "status": status,
        "money_status": money_status,
    }
    axios.put("http://localhost:3000/api/admin/help_request_edit", body, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const text = "با موفقیت ذخیره شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
    }).catch(err => {
        const text = "ارسال داده با خطا مواجه شده است";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    });
}
//---- role setting
function check_super_admin(default_role, id) {
    axios.get("http://localhost:3000/api/superAdmincheck", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.role == true) {
            document.getElementById("change_role").innerHTML = `
            <input type="text" id="role_input" onchange="change_role('${default_role}','${id}')" value="${default_role}">`;
        }

    }).catch(err => { });
}
function change_role(old_role, id) {
    const new_role = document.getElementById("role_input");
    if (new_role.value == "user" || new_role.value == "admin") {
        const body = {
            role: new_role.value
        }
        axios.put("http://localhost:3000/api/super_admin/change_role/" + id, body, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const text = "نقش کاربر با موفقیت تغییر داده شد";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
            member_detail(id);
        }).catch(err => { });
    } else {
        new_role.value = old_role;
        const text = "نقش وارد شده معتبر نمی باشد";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    }

}
//---- comments section
function comment_list() {
    const father = document.querySelector("tbody");
    father.innerHTML = "";
    axios.get("http://localhost:3000/api/admin/comments", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((item, index) => {
            var tr = document.createElement("tr");
            tr.id = item._id;
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.text}</td>
            <td>${item.create_date}</td>
            <td>${item.father_id}</td>
            <td>
                <button class="delete_button" onclick="delete_comment('${item._id}')">حذف</button> 
                <button class="accept_button" onclick="accept_comment('${item._id}')">تایید</button>
            </td>`
            father.appendChild(tr);
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function accept_comment(id) {
    const body = {
        status: "accepted",
    }
    axios.put("http://localhost:3000/api/admin/comments/" + id, body, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const text = "با موفقیت ذخیره شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
        comment_list();
    }).catch(err => {
        window.location.assign("/");
    });
}
function delete_comment(id) {
    if (confirm("ایا از این کار اطمینان دارید ؟")) {
        axios.delete("http://localhost:3000/api/admin/comments/" + id, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const text = "با موفقیت حذف شد";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
            comment_list();
        }).catch(err => {
            window.location.assign("/");
        });
    }
}
//---- orders tab
function order_list() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/orders", {
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
                if (index % 2 == 0) {
                    tr.style.backgroundColor = "rgb(200,200,200)";
                } else {
                    tr.style.backgroundColor = "rgb(241, 241, 241)";
                }
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.refID}</td>
                    <td>${item.buyer_name}</td>
                    <td>${item.total_price} تومان</td>
                    <td>${item.date}</td>
                    <td style="background : ${status_color}">
                        <select class="status_select" onchange="change_order_status('${item._id}','${index}')">
                            <option value="${item.status}" selected disabled hidden>${item.status}</option>
                            <option value="انجام شده"> انجام شده</option>
                            <option value="ارسال شده">ارسال شده</option>
                            <option value="در حال آماده سازی">در حال آماده سازی</option>
                            <option value="در حال بررسی">در حال بررسی</option>
                        </select>
                    </td>
                    <td>
                        <button id="detail_button" onclick="order_detail('${item._id}')">مشاهده جزئیات</button>
                    </td>` ;
                father.appendChild(tr);
            });
        }

    }).catch(err => {
        window.location.assign("/");
    });
}
function change_order_status(id, index) {
    const body = {
        status: document.getElementsByClassName("status_select")[index].value,
    }
    axios.put("http://localhost:3000/api/admin/orders/" + id, body, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const text = "با موفقیت ذخیره شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
    }).catch(err => {
        window.location.assign("/");
    });
}
function find_payment() {
    const father = document.querySelector("tbody");
    father.innerHTML = '';
    const search = document.getElementById("wanted").value;
    axios.get("http://localhost:3000/api/admin/orders/" + search, {
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
                <td>${item.total_price}</td>
                <td>${item.date}</td>
                <td style="background : ${status_color}">
                    <select id="selectOrderStatus" onchange="change_order_status('${item._id}')">
                        <option value="${item.status}" selected disabled hidden>${item.status}</option>
                        <option value="انجام شده">انجام شده</option>
                        <option value="درحال بررسی">درحال بررسی</option>
                        <option value="درحال آماده سازی">درحال آماده سازی</option>
                        <option value="ارسال شده">ارسال شده</option>
                    </select>
                </td>
                <td>
                    <button id="detail_button" onclick="order_detail('${item._id}')">مشاهده جزئیات</button>
                </td>`
                father.appendChild(tr);
            });
        }
    })
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
        window.location.assign("/500.html")
    });
}
function backToOrders() {
    document.getElementsByTagName("table")[0].style.display = "table";
    document.getElementById("orderPage").style.display = "none";
    document.getElementById("orderList_header").style.display = "block";
}
//----- offer
function create_offer() {
    let body = {
        code: document.getElementById("offer_code").value,
        time: document.getElementById("offer_time").value,
        value: document.getElementById("offer_value").value,
    }
    if (!body.time || !body.value) {
        const text = "شما باید همه ی گزینه ها را پر کنید";
        call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
    } else {
        axios.post("http://localhost:3000/api/admin/newOffer", body, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            document.getElementById("offer_code").value = res.data;
            const text = "کد تخفیف با موفقیت ذخیره شد";
            call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
        })
    }

}
function load_offer() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/offers", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((item, index) => {
            var tr = document.createElement("tr");
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.offer_code}</td>
                <td>${item.expire_time} روز</td>
                <td>${item.offer_value} %</td>
                <td>${item.create_date}</td>`;
            father.appendChild(tr);
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
//----- course
function create_course() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    const name = document.forms["course"]["course_name"];
    const price = document.forms["course"]["course_price"];
    const type = document.forms["course"]["course_type"];
    const course_leangth = document.forms["course"]["course_leangth"];
    const course_time = document.forms["course"]["course_time"];
    const course_teacher = document.forms["course"]["course_teacher"];
    const info = document.forms["course"]["course_information"];
    const place = document.forms["course"]["course_place"];
    const hours = document.forms["course"]["course_hours"];
    const start_date = document.forms["course"]["start_date"];
    const image = document.getElementById("course_image");
    if (!placeID) {
        if (!name.value || !price.value || !type.value || !course_leangth.value ||
            !course_time.value || !course_teacher.value || !place.value || !hours.value ||
            !image.files[0] || !start_date.value) {
            const text = "شما باید قسمت های ستاره دار را پر کنید !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else {
            const body = new FormData();
            body.append("name", name.value);
            body.append("type", type.value);
            body.append("length", course_leangth.value);
            body.append("time", course_time.value);
            body.append("teacher", course_teacher.value);
            body.append("price", price.value);
            body.append("info", info.value);
            body.append("place", place.value);
            body.append("hours", hours.value);
            body.append("start_date", start_date.value);
            body.append("picture", image.files[0]);
            axios.post("http://localhost:3000/api/admin/create_course", body, {
                headers: {
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then(res => {
                const text = "کالا با موفقیت به فروشگاه اضافه شد";
                call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
                name.value = "";
                type.value = "none";
                course_leangth.value = "";
                course_teacher.value = "";
                course_time.value = "";
                price.value = "";
                info.value = "";
                place.value = "";
                hours.value = "";
                start_date.value = "";
                image.files[0] = "";
                document.getElementById("uploadLabel").style.backgroundImage = "none";
                document.getElementById("uploadLabel").style.color = "black";
            }).catch(err => {
                const text = "نام وارد شده تکراری می باشد";
                call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
            });
        }
    } else {
        if (!name.value || !price.value || !type.value || !course_leangth.value ||
            !course_time.value || !course_teacher.value || !place.value ||
            !hours.value || !start_date.value) {
            const text = "شما باید قسمت های ستاره دار را پر کنید !";
            call_cs_popup(text, 4000, "black", "rgba(255, 38, 38, 0.59)");
        } else {
            if (!image.files[0]) {
                const body = {
                    name: name.value,
                    type: type.value,
                    length: course_leangth.value,
                    time: course_time.value,
                    teacher: course_teacher.value,
                    price: price.value,
                    info: info.value,
                    place: place.value,
                    hours: hours.value,
                    start_date: start_date.value,
                }
                axios.put("http://localhost:3000/api/admin/edit_course/" + placeID, body, {
                    headers: {
                        'x-auth-token': localStorage.getItem("token")
                    }
                }).then(res => {
                    const text = "کالا با موفقیت ویرایش شد";
                    call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
                    window.location.href = "./class_list.html";
                }).catch(err => {
                    window.location.assign("/500.html")
                });
            } else {
                const body = new FormData();
                body.append("name", name.value);
                body.append("type", type.value);
                body.append("length", course_leangth.value);
                body.append("time", course_time.value);
                body.append("teacher", course_teacher.value);
                body.append("price", price.value);
                body.append("info", info.value);
                body.append("place", place.value);
                body.append("hours", hours.value);
                body.append("start_date", start_date.value);
                body.append("picture", image.files[0]);
                axios.put("http://localhost:3000/api/admin/edit_courseP/" + placeID, body, {
                    headers: {
                        'x-auth-token': localStorage.getItem("token")
                    }
                }).then(res => {
                    const text = "کالا با موفقیت ویرایش شد";
                    call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
                    window.location.href = "./class_list.html";
                }).catch(err => {
                    window.location.assign("/500.html")
                });
            }
        }
    }
}
function load_courses() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/courses", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((item, index) => {
            var tr = document.createElement("tr");
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            let type;
            switch (item.type) {
                case "paint":
                    type = "نقاشی";
                    break;
                case "pottery":
                    type = "سفال";
                    break;
                case "sculpture":
                    type = "مجسمه";
                    break;
            }
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${type}</td>
                <td>${item.members} نفر</td>
                <td>${item.length}</td>
                <td>${item.time}</td>
                <td>
                    <select class="select_status" onchange="course_status('${item._id}' , '${index}')">
                        <option class="waiting" value="waiting">به زودی</option>
                        <option class="done" value="done">تمام شده</option>
                        <option class="ongoing" value="ongoing">در حال برگزاری</option>
                    </select>
                </td>
                <td>${item.price} تومان</td>
                <td><button class="detail_button" onclick="courses_detail('${item._id}')">جزئیات</button> <button class="info_button" onclick="gotoEditCourse('${item._id}')">ویرایش</button></td>`;
            father.appendChild(tr);
            document.getElementsByClassName(item.status)[index].selected = true;
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function course_status(id, index) {
    const status = document.getElementsByClassName("select_status")[index].value
    axios.put("http://localhost:3000/api/admin/course_status/" + id, { status }, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const text = "با موفقیت ذخیره شد";
        call_cs_popup(text, 4000, "black", "rgb(25 215 0 / 59%)");
    }).catch(err => {
        window.location.assign("/500.html")
    })
}
function courses_detail(id) {
    document.getElementById("class-list").style.display = "none";
    document.getElementById("courseDetail").style.display = "block";
    axios.get("http://localhost:3000/api/admin/coursedetail/" + id, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const course = res.data;
        const array = course.picture.split("\\");
        const picture = array[3];
        document.getElementById("courseDetail").innerHTML = `
        <h3 id="detail-head">جزئیات دوره</h3>
        <h3 id="back-button" onclick="backToCourse()">بازگشت</h3>
        <table>
            <tbody>
                <tr>
                    <td>آی دی</td>
                    <td>${course._id}</td>
                </tr>
                <tr>
                    <td>نام دوره</td>
                    <td>${course.name}</td>
                </tr>
                <tr>
                    <td>دسته بندی</td>
                    <td>${course.type}</td>
                </tr>
                <tr>
                    <td>تعداد عضو</td>
                    <td>${course.members}</td>
                </tr>
                <tr>
                    <td>تعداد جلسات</td>
                    <td>${course.length}</td>
                </tr>
                <tr>
                    <td>مدت زمان</td>
                    <td>${course.time}</td>
                </tr>
                <tr>
                    <td>ساعات برگزاری</td>
                    <td>${course.hours}</td>
                </tr>
                <tr>
                    <td>وضعیت</td>
                    <td>${course.status}</td>
                </tr>
                <tr>
                    <td>هزینه ثبت نام</td>
                    <td>${course.price}</td>
                </tr>
                <tr>
                    <td>تاریخ شروع</td>
                    <td>${course.start_date}</td>
                </tr>
                <tr>
                    <td>توضیحات</td>
                    <td>${course.info}</td>
                </tr>
                <tr>
                    <td>مدرس</td>
                    <td>${course.teacher}</td>
                </tr>
                <tr>
                    <td>محل برگزاری</td>
                    <td>${course.place}</td>
                </tr>
                <tr>
                    <td>تصویر</td>
                    <td>
                        <img src="../public/image/${picture}">
                    </td>
                </tr>
            </tbody>
        </table> ` ;
    }).catch(err => {
        window.location.assign("/");
    });
}
function backToCourse() {
    document.getElementById("class-list").style.display = "block";
    document.getElementById("courseDetail").style.display = "none";
}
function gotoEditCourse(id) {
    window.location.href = `./create_class.html?place=${id}`;
}
function edit_course() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    if (placeID) {
        document.getElementById("aside_create_class").classList.remove("active");
        document.getElementById("aside_class_list").classList.add("active");
        document.getElementById("mid_titr").innerText = "ویرایش دوره";
        document.getElementById("submit_button").value = "ویرایش";
        const name = document.forms["course"]["course_name"];
        const price = document.forms["course"]["course_price"];
        const type = document.forms["course"]["course_type"];
        const course_leangth = document.forms["course"]["course_leangth"];
        const course_time = document.forms["course"]["course_time"];
        const course_teacher = document.forms["course"]["course_teacher"];
        const info = document.forms["course"]["course_information"];
        const place = document.forms["course"]["course_place"];
        const hours = document.forms["course"]["course_hours"];
        const start_date = document.forms["course"]["start_date"];
        axios.get("http://localhost:3000/api/admin/coursedetail/" + placeID, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            name.value = res.data.name;
            price.value = res.data.price;
            type.value = res.data.type;
            course_leangth.value = res.data.length;
            course_time.value = res.data.time;
            course_teacher.value = res.data.teacher;
            info.value = res.data.info;
            place.value = res.data.place;
            hours.value = res.data.hours;
            start_date.value = res.data.start_date;
            const array = res.data.picture.split("\\");
            let picture = array[3];
            document.getElementById("uploadLabel").style.backgroundImage = "url('../public/image/" + picture + "')";
            document.getElementById("uploadLabel").style.color = "rgba(0,0,0,0)";

        }).catch(err => {
            window.location.assign("/");
        });
    }
}
function load_course_payment() {
    const father = document.querySelector("tbody");
    axios.get("http://localhost:3000/api/admin/courses/payments", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        res.data.reverse();
        res.data.map((item, index) => {
            var tr = document.createElement("tr");
            if (index % 2 == 0) {
                tr.style.backgroundColor = "rgb(200,200,200)";
            } else {
                tr.style.backgroundColor = "rgb(241, 241, 241)";
            }
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.buyer_name}</td>
                <td>${item.refID}</td>
                <td>${item.total_price} تومان</td>
                <td>${item.date}</td>
                <td>${item.member_id}</td>
                <td>${item.course_id}</td>`;
            father.appendChild(tr);
        });
    }).catch(err => {
        window.location.assign("/");
    });
}
function find_course_payment() {
    const father = document.querySelector("tbody");
    father.innerHTML = '';
    const search = document.getElementById("wanted").value;
    if (search == "") {
        load_course_payment();
    } else {
        axios.get("http://localhost:3000/api/admin/courses/payment/" + search, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            res.data.reverse();
            res.data.map((item, index) => {
                var tr = document.createElement("tr");
                if (index % 2 == 0) {
                    tr.style.backgroundColor = "rgb(200,200,200)";
                } else {
                    tr.style.backgroundColor = "rgb(241, 241, 241)";
                }
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.buyer_name}</td>
                    <td>${item.refID}</td>
                    <td>${item.total_price} تومان</td>
                    <td>${item.date}</td>
                    <td>${item.member_id}</td>
                    <td>${item.course_id}</td>`;
                father.appendChild(tr);
            });
        })
    }
}
