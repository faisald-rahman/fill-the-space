const btnClickSfx = () => {
    const f = function(i){
        var n = 1e4;
        if (i>n) return null;
        return ((Math.pow(i,1.055)&128)?1:-1)*Math.pow(t(i,n),2);
    }
      
    // Sound player
    const t=(i,n)=>(n-i)/n;
    const A=new AudioContext()
    const m=A.createBuffer(1,96e3,48e3)
    const b=m.getChannelData(0)
    for(let i=96e3;i--;)b[i]=f(i)
    const s=A.createBufferSource()
    s.buffer=m
    s.connect(A.destination)

    return s;
};

export default btnClickSfx;