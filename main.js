const screen = document.querySelector(".output-screen");                // untuk screen bawah , ngambil satu elemen dari class output-screen di HTML
const screenTop = document.querySelector(".output-screen-top");         // untuk screen atas , ngambil satu elemen dari class output-screen-top di HTML
const numbers = document.querySelectorAll(".number");                   // untuk button nomer , ngambil semua elemen ( nomer 0 sampe 9 ) dari class number , bentuk array
const operators = document.querySelectorAll(".math");                   // untuk button operator , ngambil semua elemen ( +, -, x, / ) dari class math 
const equals = document.querySelector(".equals");                       // untuk button sama dengan
const allClear = document.querySelector(".clear");                      // untuk button AC atau clear semua
const decimal = document.querySelector(".decimal");                     // untuk button decimal
const percent = document.querySelector(".percent");                     // untuk button persen
const backspace = document.querySelector(".backspace");                 // untuk button backspace

let currentNumb = "";           // untuk nomer baru
let mathOperators = "";         // untuk symbol operasi matematika (+, -, x, /)
let prevNumb = "";              // untuk nomer lama , (nyimpan nomer baru saat memasukan operasi mtk)
let percentResult = "";

// ================ Screen ===============================

// menampilkan semua perhitungan di screen atas
const updateScreenTop = (display) => {
    screenTop.value = display;
}

// menampilkan perhitungan satu persatu di screen bawah
const updateScreen = (display) => {
    screen.value = display;
}

// =========================================================

//=======================Tombol Nomer========================

// memasukan nomer
numbers.forEach((number) =>{ // memanggil nomer dalam const numbers yang berbentuk array satu persatu
    number.addEventListener("click", (numbEvent) => { //waktu button nomer di klik
        inputNumber(numbEvent.target.value); // value button class number di HTML menjadi input pada inputNumber
        updateScreen(currentNumb); // menampilkan angka baru ke screen bawah
    })
})

let inputNumber = (input) =>{
    if( currentNumb === '0'){ //mencegah agar angka pertama bukan 0
        currentNumb = input;
    }
    else{  // biar angka selanjutnya gk nimpa angka sebelumnya (jadi bisa memasukkan angka puluhan ke atas)
        currentNumb += input;
    }
}

//===============================================================

//=====================Tombol Decimal=============================

decimal.addEventListener("click", (decimalEvent) => { // waktu button . di klik
    inputDecimal(decimalEvent.target.value); // value  button class decimal jadi point di inputDecimal
    updateScreen(currentNumb); //menampilkan angka baru ke screen bawah
})

let inputDecimal = (point) => {
    currentNumb += point; //angka dan koma tidak saling nimpa
}

//==================================================================

//==================== Tombol Percent ===============================

percent.addEventListener("click", (percentEvent) => { // waktu button % di klik
    inputPercent(percentEvent.target.value); // value button class percent jadi  input di inputDecimal
    updateScreen(currentNumb); //menampilkan angka baru ke screen bawah
})

let inputPercent = (input) => {
    currentNumb += input;
}

//====================================================================

//=================== Tombol Operator MTK ==============================

operators.forEach((operator) =>{ // memanggil symbol mtk dalam const operators yang berbentuk array satu persatu
    operator.addEventListener("click", (operatorEvent) => { //saat button symbol mtk di klik
        inputOperator(operatorEvent.target.value); // value button class math di HTML jadi input di inputOperator
        updateScreenTop(`${prevNumb} ${mathOperators}`); // menampilkan angka sebelum nya dan symbol mtk di screen atas
        updateScreen(mathOperators); // update screen bawah, menampilkan symbol mtk di screen bawah
    })
})

let inputOperator = (input) =>{
    if (mathOperators === ""){ // mencegah mengetik operator mtk lebih dari 1 kali sebelum memasukan angka baru , contoh salah => 1 ++ 2
        prevNumb = currentNumb; // angka baru yg di currentNumb di simpan ke prevNumb
    }
    mathOperators = input; // operator mtk sebagai value untuk mathOperators
    currentNumb = ""; // nilai currentNumb kosong setelah memasukan operator mtk
}

//=========================================================================

//==================== Mengolah Bilangan Berbentuk Persen atau Bukan ===============

// Check bilangan pertama
let percentForPrevNumb = () => {
    let percentPrevNumb = prevNumb.split(""); //prevNumb dijadikan Array
    const findPercentPrevNumb = percentPrevNumb.find((finds) => { //mencari array '%' di prevNumb
        return finds === '%';
    });
    if(findPercentPrevNumb === '%'){ // jika ada % , nilai prevNumb diganti dengan nilai hasil rumus
        percentResult = parseFloat(prevNumb)*0.01;
        prevNumb = percentResult;
    }
}

// Check bilangan ke dua
let percentForCurrentNumb = () => {
    let percentCurrentNumb = currentNumb.split("");
    const findPercentCurrentNumb = percentCurrentNumb.find((finds) => {
        return finds === '%';
    });
    if(findPercentCurrentNumb === '%'){
        percentResult = parseFloat(prevNumb) * (parseFloat(currentNumb)*0.01);
        currentNumb = percentResult;
    }
}

//=====================================================================================

//============================= Sama Dengan ========================================
equals.addEventListener("click", () =>{ // waktu = di klik

    percentForPrevNumb();
    percentForCurrentNumb();
    
    let result = ""; //wadah hasil perhitungan
    switch (mathOperators) {
        case "+": //kasus ketika + yg di klik
            result = parseFloat(prevNumb) + parseFloat(currentNumb); //pakai parseFloat agar prevNumb dan currentNumb jd float (karna ada nilai decimal jg gk cmn integer)
            break; //biar case yg bawah gak ikut ke eksekusi
        case "-": //kasusu ketika - yg di klik
            result = parseFloat(prevNumb) - parseFloat(currentNumb);
            break;
        case "x": //kasus ketika x yg di klik
            result = parseFloat(prevNumb) * parseFloat(currentNumb);
            break;
        case "/": //kasus ketika / yang di klik
            result = parseFloat(prevNumb) / parseFloat(currentNumb);
            break;
        default: //kasus selain yang di atas
            return;
    }
    prevNumb = result.toString(); //hasil perhitungan bisa dijumlahkan lagi , tipe data result di ubah ke string
    updateScreen(prevNumb); //update screen bawah , hasil perhitungan di tampilkan di screen bawah
    updateScreenTop("");
})

//============================================================================

//==================== Tombol Clear All ============================================

const clearAll = () =>{
    // semua nilai jd kosong / di hapus
    prevNumb = "";
    mathOperators = ""; 
    currentNumb = "";
}

allClear.addEventListener("click", () =>{ //waktu button AC di klik
    // nilai dan yg di screen di hapus
    clearAll();
    updateScreen(currentNumb);
    updateScreenTop(currentNumb);
})

//======================================================================

//==================== Tombol Backspace ==============================

backspace.addEventListener("click", () => { //waktu button backspace di klik
        currentNumb = currentNumb.slice(0, currentNumb.length - 1);  //nomer yang lg di masukkan bisa di hapus satu persatu dr belakang , slice(start, end)
        updateScreen(currentNumb);
})

//========================================================================
