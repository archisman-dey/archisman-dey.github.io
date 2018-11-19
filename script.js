dispbutton();

window.addEventListener("resize", function(){dispbutton();});

function dispbutton()
{
	var b = document.getElementById('button');
	var x = window.matchMedia("(max-width: 500px)");
	if (x.matches)
	{
		document.getElementById("cartoon").style.height = 'auto';
		b.innerHTML = "Fit to Page";
		b.style.display = "none";
	}
	else
	{
		b.style.display = "inline-block";
	}
}

function respond()
{
	var b = document.getElementById('button');
	if (b.innerHTML == "Fit to Page")
	{
		document.getElementById("cartoon").style.height = '100vh';
		b.innerHTML = "Expand";
	}
	else if (b.innerHTML == "Expand")
	{
		document.getElementById("cartoon").style.height = 'auto';
		b.innerHTML = "Fit to Page";
	}	
}