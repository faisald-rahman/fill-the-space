// Sound
const clickSfx = () => {
    const f = function(i) {
        var n=1e4;
        var c=n/3;
        if (i > n) return null;
        var q=Math.pow(t(i,n),2.1);
        return (Math.pow(i,3)&(i<c?16:99))?q:-q;
    }

    const t=(i,n)=>(n-i)/n;
    const A=new AudioContext()
    const m=A.createBuffer(1,96e3,48e3)
    const b=m.getChannelData(0)
    for(let i=96e3;i--;)b[i]=f(i)
    const sfx=A.createBufferSource()
    sfx.buffer=m
    sfx.connect(A.destination)

    return sfx;
}

export default clickSfx;