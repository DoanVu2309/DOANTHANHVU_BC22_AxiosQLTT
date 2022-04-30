var services = new Services();
var validation = new Validation();

function getListUser() {
    services
        .fetchData()
        .then(function(result) {
            services.arr = result.data;
            renderHTML(result.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}
getListUser();

function renderHTML(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        content += `
        <tr>
            <td>${i + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${
                    user.id
                })">Sửa</button>
                <button class="btn btn-danger" onclick="xoa(${
                    user.id
                })">Xoá</button>
            </td>
        </tr>
    `;
    }
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}
/**
 * Xoá
 */
function xoa(id) {
    services
        .deleteUser(id)
        .then(function(result) {
            // Xoá thành công = fetch lại data mới
            getListUser();
        })
        .catch(function(error) {
            console.log(error);
        });
}
/**
 * Thêm mới
 */
getEle("btnThemNguoiDung").addEventListener("click", function() {
    // // Xoá toàn bộ dữ liệu trên form trước khi thêm mới
    // getEle("TaiKhoan").disabled = false;
    // getEle("formNguoiDung").reset();
    // Sửa lại tiêu đề modal
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";
    // add vô button Thêm dưới footer của modal
    var footer = `<button class="btn btn-success" onclick="them()">Thêm</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function them() {
    //DOM tới các thẻ input lấy value
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("LoaiNguoiDung").value;
    var ngonNgu = getEle("LoaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    //Tạo đối tượng product từ lớp đối tượng Product
    var user = new User("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    var isValid = true;
    // TaiKhoan
    isValid &= validation.checkNull(taiKhoan, "tbTaiKhoan", "(*) Vui Lòng Nhập Tài Khoản") &&
        validation.checkAccount(services.arr, taiKhoan, "tbTaiKhoan", "(*) Tài Khoản Đã Tồn Tại");
    // HoTen
    isValid &= validation.checkNull(hoTen, "tbHoTen", "(*) Vui Lòng Nhập Họ Tên") &&
        validation.checkString(hoTen, "tbHoTen", "(*) Vui Lòng Nhập Lại Đúng Chuỗi Ký Tự");
    // Pass
    isValid &= validation.checkNull(matKhau, "tbMatKhau", "(*) Vui Lòng Nhập Mật Khẩu") &&
        validation.checkPass(matKhau, "tbMatKhau", "(*) Mật Khẩu Gồm Chữ Hoa, Ký Tự Đặc Biệt Và Số");
    // Email
    isValid &= validation.checkNull(email, "tbEmail", "(*) Vui Lòng Nhập Email") &&
        validation.checkEmail(email, "tbEmail", "(*) Vui Lòng Nhập Lại Email Cho Đúng");
    // Hình Ảnh
    isValid &= validation.checkNull(hinhAnh, "tbHinhAnh", "(*) Vui Lòng Nhập Hình Ảnh");
    // LoaiND
    isValid &= validation.checkSelect("LoaiNguoiDung", "tbLoaiND", "(*) Vui Lòng Chọn Người Dùng");
    // NgonNgu
    isValid &= validation.checkSelect("LoaiNgonNgu", "tbLoaiNN", "(*) Vui Lòng Chọn Ngôn Ngữ");
    // MoTa
    isValid &= validation.checkNull(moTa, "tbMoTa", "(*) Vui Lòng Nhập Mô Tả") &&
        validation.checkLength(moTa, "tbMoTa", "(*) Vui Lòng Nhập Lại Từ 1 Đến 60 Ký Tự", 1, 60);
    if (isValid) {
        // Gọi tới phương thức service
        services
            .addUser(user)
            .then(function() {
                // Thêm thành công = fetch lại data mới
                getListUser();
                // Tắt modal
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
/**
 * Sửa
 */
function sua(id) {
    // Sửa lại tiêu đề modal
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
    // add vô button Cập Nhật dưới footer của modal
    var footer = `<button class="btn btn-warning" onclick="capNhat(${id})">Cập Nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    // gọi tới phương thức services để lấy product từ server
    services
        .getUserById(id)
        .then(function(result) {
            var user = result.data;
            //dom tới các thẻ input lấy value
            getEle("TaiKhoan").value = user.taiKhoan;
            getEle("TaiKhoan").disabled = true;
            getEle("HoTen").value = user.hoTen;
            getEle("MatKhau").value = user.matKhau;
            getEle("Email").value = user.email;
            getEle("HinhAnh").value = user.hinhAnh;
            getEle("loaiNguoiDung") = user.loaiND;
            getEle("loaiNgonNgu") = user.ngonNgu;
            getEle("MoTa").value = user.moTa;
        })
        .catch(function(error) {
            console.log(error);
        });
}
/**
 * Cập nhật
 */
function capNhat(id) {
    //DOM tới các thẻ input lấy value
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var loaiND = getEle("LoaiNguoiDung").value;
    var ngonNgu = getEle("LoaiNgonNgu").value;
    //Tạo đối tượng product từ lớp đối tượng Product
    var user = new User("", taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu);
    // gọi tới phương thức services để lấy product từ server
    services
        .updateUser(id, user)
        .then(function() {
            // Cập nhật thành công = fetch lại data mới
            getListUser();
            // Xoá dữ liệu trên form sau khi cập nhật thành công
            getEle("TaiKhoan").disabled = false;
            getEle("formNguoiDung").reset();
            // Tắt modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getEle(id) {
    return document.getElementById(id);
}