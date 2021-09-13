const circleSfx = () => {
    // Sound
    const f = function(i){
        var n=5e4;
        var n1=1e5;
        if (i > n) return null;
        i=Math.pow(i,1-Math.sin(i/n1))*5.3;
        var x=Math.sin(i/30+Math.sin(i/1500));
        return Math.pow(x,9)*t(i,n);
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
}

export default circleSfx;