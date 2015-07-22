(function(){
window.onload = function(){
	yy.start();
}

var yy = {};

yy.start = function(){
	yy.sort();
}
/*						元素个数			时间
*  	JS 直接插入排序		10k					31ms
						100k				2636ms
						1000k				1,041,383ms 
*	JS Shell Sort		10k					140ms
						100k				12,228ms
*	JS 冒泡排序 		10k 	  			1362 ms
						100k				134,381ms
*	JS 快速排序 		10k					70ms		
						100k				5200 ms ~ 11,000ms
*/
yy.sort = function(){
	var prop = {},
		num = 100;
	prop.arr = A().random( num );
	
	Html( "<h2>要排序"+ num +"个元素的数组(打开控制台查看时间性能信息，建议对10k~100k个元素进行测试)</h2>" + prop.arr.join() );
	
	var result = Sort( prop ).straightInsertionSort();
	console.log( result );
	
	var result = Sort( prop ).shellSort();
	console.log( result );
	
	var result = Sort( prop ).simpleSelectionSort();
	console.log( result );
	
	var result = Sort( prop ).bubbleSort();
	console.log( result );

	var result = Sort( prop ).quickSort();
	console.log( result );
}


function Sort( prop ){
	if( this instanceof Sort ){
		this.arr = prop.arr;
		this.result = [];
	}else{
		return new Sort( prop );
	}
}
Sort.prototype={
	straightInsertionSort : function(){		//cha ru paixu		O(n^2)
		var arr = [],
			source = this.arr.concat( [] );
			one = source.shift(),
			time = + new Date();
			
		console.log( source );
		arr.push( one );
		while( source.length > 0 ){
			one = source.shift();
			insert( one, arr );
		}
		function insert( val, arr ){
			var bool = false;
			//如果碰见一个和插入元素相等的，那么插入元素把想插入的元素放在相等元素的后面。
			//所以，相等元素的前后顺序没有改变，
			//从原无序序列出去的顺序就是排好序后的顺序，所以插入排序是稳定的。
			for( var i = 0; i < arr.length; i++ ){
				if( arr[i] > val ){
					bool = true;
					arr.splice( i , 0 , val );
					break;
				}
			}
			if( !bool ) arr.push( val );
		}
		
		html = "<br>直接插入排序后：<br>" + arr.join();
		Html( html );
		console.log( 'StraightSort:' + (+new Date() - time) + 'ms'  );
		this.result = arr;
		return arr;
	},
	shellSort : function(){					// 希尔排序			O(n^1.3)
		// 相对直接排序有较大的改进
		// 比较相隔较远距离（称为增量）的数，使得数移动时能跨过多个元素，则进行一次比[2] 较就可能消除多个元素交换。
		var len = this.arr.length,
			d = Math.floor(len/2),
			d = d === 0 ? 1 : d,
			arr = this.arr.concat( [] ),
			time = + new Date();
			
		console.log( arr );
		while( d >= 1 ){
			for( var i = 0; i + d < arr.length; i++ ){
				if( arr[i] > arr[i+d] ){
					A( arr ).swap( i, i+d );
				}
			}
			d --;
		}
		console.log( 'Shell:' + ( (+ new Date() ) - time )+ 'ms' );
		this.result = arr;
		html = "<br>希尔排序后：<br>" + arr.join();
		Html( html );
		return arr;
	},
	simpleSelectionSort : function(){		//选择排序—简单选择排序	O(n^2)
		var arr = this.arr.concat( [] ),
			min,
			minIndex;
			
		console.log( "simpleSelectionSort..." );
		console.log( arr );
		
		for( var i = 0; i < arr.length; i++ ){
			minIndex = A( arr ).minIndex( i );
			min = arr[minIndex];
			console.log( min +'---' + arr[i] );
			if( arr[i] > min ){
				console.log( A( A( arr ).biaoji(i) ).biaoji(minIndex) );
				A( arr ).swap( i, minIndex );
				console.log( A( A( arr ).biaoji(i) ).biaoji(minIndex) );
			}else{
				console.log( A( arr ).biaoji( i, '!' ) );
			}
		}
		html = "<br>简单选择排序后：<br>" + arr.join();
		Html( html );
		return arr;
	},
	bubbleSort  : function( ){				//冒泡排序				O(n^2)
		var arr = this.arr.concat( [] ),
			time = + new Date();
		console.log( arr );
		for(var i = 0; i < arr.length - 1; i ++ ){
			for(var j = 0; j < arr.length - i -1; j++ ){
				if( arr[j] > arr[j+1] && arr[j+1] !== undefined ){
					A( arr ).swap( j, j+1 );
				}
			}
		}
		html = "<br/>冒泡排序后<br>" + arr.join( ',' );
		Html( html );
		
		console.log( ( + new Date() ) - time + 'ms' );
		return arr;
	},
	quickSort : function(){					//快速排序			O(nlog(n))
		var arr = this.arr.concat( [] ),
			time = + new Date();
		
		console.log( arr );
		sort( 0, arr.length-1 );
		function sort( m, n ){
			var first = arr[m],
				nowIndex = m;
			for( var i = m ; i <= n; i++ ){
				if( arr[i] < first ){
					arr.splice( nowIndex, 0, arr.splice( i, 1 )[0] );
					nowIndex ++;
				}
			}
			if( nowIndex - m >= 2 ){
				sort( m, nowIndex-1 );
			}
			if( n - nowIndex >= 2 ){
				sort( nowIndex+1, n );
			}
			return true;
		}
		console.log( +new Date() - time + 'ms' );
		html = "<br>快速排序后：<br>" + arr.join();
		Html( html );
		return arr;
	},
};
function A( prop ){
	if( this instanceof A ){
		if( prop instanceof Array ){
			this.arr = prop;
		}else if( prop !== undefined ){
			this.arr = prop.arr;
		}
	}else{
		return new A( prop );
	}
}
A.prototype={
	swap : function( i, j ){	//交换数组第i，j俩个元素
		if( i === j ) return false;
		this.arr[i] = this.arr[i] ^ this.arr[j];
		this.arr[j] = this.arr[i] ^ this.arr[j];
		this.arr[i] = this.arr[i] ^ this.arr[j];
	},
	minIndex : function( i, j ){
		var arr = this.arr.concat( [] ),
			i = i === undefined ? 0 : i,
			j = j === undefined ? arr.length-1 : j, 
			min = arr[i],
			index = i;
		for( var m = i; m <= j; m++ ){
			if( min > arr[m] ){
				min = arr[m];
				index = m;
			}
		}
		return index;
	},
	biaoji : function( i, style ){
		var arr = this.arr.concat( [] ),
			style = style ===undefined ? '*' : (style+'');
		arr[i] += style;
		return arr;
	},
	random : function( n ){ 	//产生n个元素的随机数组
		var arr = [],
			n = n || 10;
		for( var i = 0; i < n; i++ ){
			arr.push( parseInt(Math.random().toFixed(2) * 100) );
		}
		return arr;
	}
};

function Html( val ){
	var div = document.createElement( 'div' );
	div.innerHTML = val;
	div.setAttribute( 'style', 'padding:20px;border:1px solid #ccc;margin:10px 0;' );
	document.body.appendChild( div );
}

window.A = A;

})()
