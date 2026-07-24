function f(n,r=Math.random){const t=n.slice();for(let e=t.length-1;e>0;e--){const o=Math.floor(r()*(e+1)),s=t[e];t[e]=t[o],t[o]=s}return t}export{f};
