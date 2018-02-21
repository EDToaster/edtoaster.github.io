arraySum = function(foo, bar) {
  var foobar = [];

  for (var i = 0; i < foo.length; i++) {
    foobar[i] = foo[i] + bar[i];
  }
  return foobar;
};

arrayMult = function(foo, k) {
  var foobar = [];
  for (var i = 0; i < foo.length; i++) {
    foobar[i] = foo[i] * k;
  }
  return foobar;
};


RK4 = function(f, x, h) {
  var a = [];
  var b = [];
  var c = [];
  var d = [];
  var xnew = [];

  for (i = 0; i < x.length; i++) {
    a[i] = f[i].apply(null, x);
  }

  xnew = arraySum(x, arrayMult(a, h / 2));

  for (i = 0; i < x.length; i++) {
    b[i] = f[i].apply(null, xnew);
  }
  xnew = arraySum(x, arrayMult(b, h / 2));

  for (i = 0; i < x.length; i++) {
    c[i] = f[i].apply(null, xnew);
  }
  xnew = arraySum(x, arrayMult(c, h));

  for (i = 0; i < x.length; i++) {
    d[i] = f[i].apply(null, xnew);
  }

  for (i = 0; i < x.length; i++) {
    xnew[i] = x[i] + h / 6 * (a[i] + 2 * b[i] + 2 * c[i] + d[i]);
  }

  return xnew;
};