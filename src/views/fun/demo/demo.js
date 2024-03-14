export const Mixins = {
	data() {
		arr: ["1", 1, "1", "2", "we", "we", "12", "hello", "word"];
	},
	methodes: {
        /* 
            手写call 
                改变this指向
                动态传递参数
                兼容new关键字
        */
        myCall(){
            
        },

		// 数组去重的方法
		/* 1. Set */
		setFun() {
			let arr = this.arr;
			let newArr = Array.from(new Set(arr));
			console.log("—————-set————————", newArr);
			return newArr;
		},
		/* 2. 两层for+splice */
		forFun() {
			let arr = this.arr;
			let len = arr.length;
			for (let i = 0; i < len; i++) {
				for (let j = i + 1; j < len; j++) {
					if (arr[i] === arr[j]) {
						arr.splice(j, 1);
						len--;
						j--;
					}
				}
			}
            console.log("-----双层for循环-----",arr);
            return arr;
		},
	},
};
