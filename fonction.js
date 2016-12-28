min=2;
max=62;


liste=document.getElementById('liste') ;
possibilites = Array();
P= Array();
S= Array();
P1= Array();
S2= Array();
P3= Array();
S3= Array();
P4= Array();
S4= Array();
possibilites1 = Array();
possibilites2 = Array();
possibilites3 = Array();
possibilites4 = Array();
function init()
{
	chaine="";
	k=0;
	for (i = min; i <max+1; i++) 
	{
		for (j = min; j < i+1; j++) 
		{
			tableau=Array();
			tableau=[i,j];
			possibilites[k]=tableau;
			P[k]=i*j;
			S[k]=i+j;
			k=k+1;
		}
	}
document.getElementById('max').innerHTML=max;
document.getElementById('min').innerHTML=min;
}

function metajourPetS()
{
	k=0;
	for (i = 0; i <possibilites.length; i++) 
	{
			element=possibilites[i];
			
			a=element[0];
			b=element[1];
			P[i]=a*b;
			S[i]=a+b;
		}
	}

function affichepossilite(tableau,tabs,tabp)
{
	chaine="";
	chaines="";
	chainep="";
	j=0;
	for (i = 0; i < tableau.length; i++) 
	{
			if (tableau[i]!="#,#")
			{
				j++;
			}
			if (tableau[i]!="#,#")
			{
				chaine=chaine+"["+tableau[i]+"] ";
			}
			if (tabs[i]!="#")
			{
				chaines=chaines+"["+tabs[i]+"] ";
			}
			if (tabp[i]!="#")
			{
				chainep=chainep+"["+tabp[i]+"] ";
			}
	}
	document.getElementById('liste').innerHTML=chaine;
	document.getElementById('listep').innerHTML=chainep;
	document.getElementById('listes').innerHTML=chaines;
	document.getElementById('nbpossibilite').innerHTML=j;	
}
window.onload = function()
{
	init();
	affichepossilite(possibilites,S,P);
}


function copietableau(tableau)
{
	tab=Array();
	for (i = 0; i < tableau.length; i++) 
	{
		tab[i]=tableau[i];
	}
	return tab;
}

function apresphrase1()
{
	alert("On garde que les possibilités qui sont des doublons pour le produit.");
	P1=copietableau(P);
	S1=copietableau(S);
	possibilites1=copietableau(possibilites);
	//On cache les solos
	for (i = 0; i < P.length; i++) 
	{
		valeur=P[i];
		if ((P.indexOf(valeur, i+1)==-1)&&(P.indexOf(valeur)==i))
		{
				P1[i]="#";
				possibilites1[i]="#,#";
				
			}
	}
	affichepossilite(possibilites1,S1,P1);
	document.getElementById('bouton2').disabled=false ;
	
}

function apresphrase2()
{
	alert("On garde que les possibilités qui sont des doublons pour la somme et dont les possibilités sont inclues dans doublons du produits.");
	P2=copietableau(P1);
	S2=copietableau(S1);
	possibilites2=copietableau(possibilites1);
	valeuraenelever=Array();
	//On cache les solos d'abord
	for (i = 0; i < S2.length; i++) 
	{
		valeur=S2[i];
		if ((S2.indexOf(valeur, i+1)==-1)&&(S2.indexOf(valeur)==i))
		{
			S2[i]="#";
			possibilites2[i]="#,#";	
		}
	}
	
	for (i = 0; i < S2.length; i++) 	
	{
		valeur=S2[i];
		if (valeur!="#") //c'est un doublon
		{
			if (P1[i]=="#") //le doublon n'est pas dans les doublons du produit
			{
				if (valeuraenelever.indexOf(valeur)==-1)
				{
					valeuraenelever.push(valeur);
				}
			}
		}
	}
	for (i= 0; i < P.length; i++) 
	{
		if (P1[i]=="#")
		{
			S2[i]="#";
			possibilites2[i]="#,#";	
		}
	}
	for (i= 0; i < valeuraenelever.length; i++) 
	{
		index=S2.indexOf(valeuraenelever[i]);

		while (index!=-1)
		{
			S2[index]="#";
			possibilites2[index]="#,#";	
			index=S2.indexOf(valeuraenelever[i]);

		}
	}
	//On recache les solos restants
	for (i = 0; i < S2.length; i++) 
	{
		valeur=S2[i];
		if ((S2.indexOf(valeur, i+1)==-1)&&(S2.indexOf(valeur)==i))
		{
			S2[i]="#";
			possibilites2[i]="#,#";	
		}
	}

	for (i= 0; i < P.length; i++) 
	{
		if (S2[i]=="#")
		{
			P2[i]="#";
		}
	}
	affichepossilite(possibilites2,S2,P2);

	document.getElementById('bouton3').disabled=false ;
	
}
function apresphrase3()
{
	alert("Dans les produits, On croise les possibilités de la Somme avec celle du produit et on dégage les solos");
	P3=copietableau(P2);
	S3=copietableau(S2);
	possibilites3=copietableau(possibilites2);

	
	//On affiche les solos
	for (i = 0; i < P3.length; i++) 
	{
		valeur=P3[i];
		if (valeur!="#")
		{
			if ((P2.indexOf(valeur, i+1)!=-1)||(P2.indexOf(valeur)!=i))
			{
				P3[i]="#";
				possibilites3[i]="#,#";	
			}
		}
	}
	for (i= 0; i < P.length; i++) 
	{
		if (P3[i]=="#")
		{
			S3[i]="#";
		}
	}
	document.getElementById('bouton4').disabled=false ;
	affichepossilite(possibilites3,S3,P3);
}
function apresphrase4()
{
	alert("Dans les sommes, On croise les possibilités de la Somme avec celle du produit et on dégage les solos");
	P4=copietableau(P3);
	S4=copietableau(S3);
	possibilites4=copietableau(possibilites3);

	
	//On affiche les solos
	for (i = 0; i < S4.length; i++) 
	{
		valeur=S4[i];
		if (valeur!="#")
		{
			if ((S3.indexOf(valeur, i+1)!=-1)||(S3.indexOf(valeur)!=i))
			{
				S4[i]="#";
				possibilites4[i]="#,#";	
				P4[i]="#";
			}
		}
	}
	affichepossilite(possibilites4,S4,P4);
	recherchesol();
}

function recherchesol()
{
	for (i= 0; i < possibilites4.length; i++) 
	{
		if (possibilites4[i]!="#,#")
		{
			document.getElementById('x').value= possibilites4[i][0];
			document.getElementById('y').value= possibilites4[i][1];
		}
	}
}
