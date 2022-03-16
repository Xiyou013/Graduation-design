export const cookiefn = {
    setCookie(x, y, day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = `${x}=${y};expires=${date}`;
        // document.cookie="username=admin;expires="+date;
        // document.cookie="password=123456;expires="+date;
        var res = document.cookie;
        console.log(res);
        // getCookie(res);
    },
    // getCookie() {
    //     // console.log(res);
    //     var arr = [];
    //     var obj = {};
    //     let count = 0;
    //     if (document.cookie) {
    //         var res = document.cookie;
    //         console.log(res);
    //         var str = res.split("; ");
    //         console.log(str);
    //         for (var i = 0; i < str.length; i++) {
    //             var str1 = str[i].split("=");
    //             console.log(str1);

    //             obj[str1[0]] = str1[1];
    //             count++;
    //             console.log(obj, count);
    //             if (count % 2 === 0) {
    //                 arr.push(obj);
    //                 obj = {};
    //             }
    //         }
    //         console.log(arr);
    //         return arr;
    //     }
    //     return "cookie中没有数据存在";
    // },

    getCookie(){
        // console.log(res);
        var obj={};
        if(document.cookie){
            var res=document.cookie;
            console.log(res);
            var str=res.split('; ');
            console.log(str);
            for(var i=0;i<str.length;i++){
                var str1=str[i].split('=');
                console.log(str1);
                obj[str1[0]]=str1[1];
            }
            return obj;
        }
        return 'cookie中没有数据存在';
    },


    cha(arr, val) {
        console.log("arr:", arr, val);
        let obj = {};
        arr.forEach((element, index) => {
            console.log(element, index);
            // let ind = index + 1;
            console.log("123:", element["name" + "2"]);
            if (element["name" + "2"] === val) {
                console.log(element, index);
                obj = element;
            }
        });
        console.log(obj);
        return obj;
    },
}
