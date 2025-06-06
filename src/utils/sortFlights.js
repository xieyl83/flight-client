const sortFlights = (flights, by, asc = true) => {
  if (!flights) {
    return flights;
  }
  if (!Array.isArray(flights) || flights.length < 1) {
    return flights;
  }
  const arr = [...flights];
  if (typeof by === 'string') {
    for (const f of flights) {
      const keys = Object.keys(f);
      if (!keys.includes(by)) {
        return flights;
      }
    }
    arr.sort((a, b) => {
      const va = a[by];
      const vb = b[by];
      if (typeof va === 'string') {
        return asc ? va.localeCompare(vb) : vb.localeCompare(va);
      } else {
        return asc ? va - vb : vb - va;
      }
    });
  } else if (Array.isArray(by)) {
    for (const f of flights) {
      for (const b of by) {
        const keys = Object.keys(f);
        if (!keys.includes(b)) {
          return flights;
        }
      }
    }
    const bys = by.reverse();
    for (const bi of bys) {
      arr.sort((a, b) => {
        const va = a[bi];
        const vb = b[bi];
        if (typeof va === 'string') {
          return asc ? va.localeCompare(vb) : vb.localeCompare(va);
        } else {
          return asc ? va - vb : vb - va;
        }
      });
    }
  }
  console.log('sorted~');
  console.log(arr);
  return arr;
};

export default sortFlights;
