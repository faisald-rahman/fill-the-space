const winSfx = () => {
    const f = function(i){
        var notes = [0,4,7,12,undefined,7,12];
        var n=3.5e4;
        if (i > n) return null;
        var idx = ((notes.length*i)/n)|0;
        var note = notes[idx];
        if (note === undefined) return 0;
        var r = Math.pow(2,note/12)*0.8;
        var q = t((i*notes.length)%n,n);
        return ((i*r)&64)?q:-q
    }
  
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

export default winSfx;