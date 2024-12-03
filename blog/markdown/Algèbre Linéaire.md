# Algèbre Linéaire

De nombreux livres et cours ont déjà été écrits dessus. Mon cours n'a pas pour but de vous apprendre dans le détail tous les aspects de l'algèbre linéaire, mais seulement les aspects que nous allons utiliser dans ce cours.

Si vous vous intéressez au sujet et voulez aller plus loin, je vous invite à le faire, mais je voulais juste vous prévenir que nous n'allons pas parler de matrice de passages, théorèmes du rang, endomorphismes ou ce genre de choses puisqu'elles ne seront pas utilisées dans ce cours. (peut-être à l'avenir quant au fur et à mesure que j'ajoute du contenu de jours en jours, mais ce cours se veut centré sur l'IA).

Si vous connaissez déjà le contenu de ce cours de maths juste en lisant les grands titres, je vous invite à passer à la section suivante.

# Définition de l'algèbre linéaire

La définition de l'algèbre linéaire est la suivante:

**L’algèbre linéaire est la branche des mathématiques qui s'intéresse aux espaces vectoriels et aux transformations linéaires, formalisation générale des théories des systèmes d'équations linéaires.**

## Les vecteurs

Pour représenter des vecteurs (dont vous êtes probablement déjà familier), nous utilisions la notation suviante:

$$
\overrightharpoon{v} = \begin{pmatrix}
x \\
y \\
z
\end{pmatrix} \ \ 
ou\ \ \overrightharpoon{v} = (x,y,z)
$$

En ce qui concerne les operations sur les vecteurs voici une liste pour vous les rappeler:

### Opérations

| Nom                                                  | Notation                                                                                                                                                 | Explicaiton                                                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Commutativité de l'addition                          | $\overrightharpoon{u} + \overrightharpoon{v} = \overrightharpoon{v} + \overrightharpoon{u}$                                                              | Les vecteurs s'additionnent dans les deux sens                                                                   |
| Associavité de l'addition                            | $(\overrightharpoon{u} + \overrightharpoon{v}) + \overrightharpoon{w} = \overrightharpoon{u} + (\overrightharpoon{v} + \overrightharpoon{w})$            | L'ordre d'addition des vecteurs n'a as d'importance                                                              |
| Element neutre                                       | $\overrightharpoon{u} + \overrightharpoon{0} = \overrightharpoon{u}$                                                                                     | Le vecteur nul additioné à n'importe quel vecteur $\overrightharpoon{u}$ donne le vecteur $\overrightharpoon{u}$ |
| Opposé                                               | $\overrightharpoon{u} + \overrightharpoon{-u} = \overrightharpoon{0}$                                                                                    | un vecteur additioné à son opposé donne le vecteur nul                                                           |
| Associativité de la multiplication de deux scalaires | $k(c\overrightharpoon{u}) = (kc)\overrightharpoon{u}$                                                                                                    |                                                                                                                  |
| Distributivité lors de l'addition                    | $k(\overrightharpoon{u} + \overrightharpoon{v}) = k\overrightharpoon{u} + k\overrightharpoon{v}$                                                         |                                                                                                                  |
| Distributivité du produit de scalaire sur l'addition | $\overrightharpoon{u}.(\overrightharpoon{v}+\overrightharpoon{w}) = \overrightharpoon{u}.\overrightharpoon{v}+\overrightharpoon{u}.\overrightharpoon{w}$ |                                                                                                                  |
| Associtivité des scalaires dans le produit scalaire  | $k_1\overrightharpoon{u}.k_2\overrightharpoon{v} = (k_1k_2).\overrightharpoon{u}.\overrightharpoon{v}$                                                   |                                                                                                                  |
| Produit scalaire                                     | $(x_1,x_2,x_3).(y_1,y_2,y_2) = x_1y_1+x_2y_2+x_3y_3$                                                                                                     | voir multiplication de matrice pour plus de détails                                                              |
| Relation de Chasles                                  | $\overrightharpoon{AB} + \overrightharpoon{BC} = \overrightharpoon{AC}$                                                                                  | voir image ci-dessous                                                                                            |

<img title="" src="https://cms.alloprof.qc.ca/sites/default/files/styles/1200w/public/2020-07/plan.png?itok=6yHEKZEu" alt="Plan cartésien" width="204" data-align="center">

## Les matrices

Les deux notations précédentes : verticales et horizontales pour les vecteurs sont correctes, mais les vecteurs peuvent aussi être vu comme des matrices de taille $\R_{m.n}$ ou le $\R$ indique une matrice remplie de nombres réels et les indices $m.n$ indique la taille de la matrice. Plus précisément $m$ le nombre de lignes et $n$ le nombre de colonnes.

Une matrice ne s'écrit pas avec des parenthèses mais des crochets:

$$
A=\begin{bmatrix}
a & b\\
c & d \\
\end{bmatrix}
$$

Ici j'ai défini une matrice A qui contient des nombres $a,b,c$ et $d$. Sa taille vous l'aurez deviné est $2.2$ puisqu'elle contient 2 lignes et 2 colonnes. Vous êtes normalement capable de me donner les tailles suivantes:

$$
A = \begin{bmatrix}
1 & 2 & 3
\end{bmatrix}
B= \begin{bmatrix}
9.2 \\
\pi \\
7.4576812
\end{bmatrix}
C= \begin{bmatrix}
a_{11} && a_{12} && a_{13} && a_{14} \\
a_{21} && a_{22} && a_{23} && a_{24} \\
a_{31} && a_{32} && a_{33} && a_{44} \\  
\end{bmatrix}
$$

Si vous avez dit $A_{1.3}$ ou vecteur ligne, $B_{3.1}$ ou vecteur colonne et $C_{3.4}$ vous avez raison.

Vous remarquerez que pour la matrice $C$. Je l'ai rempli de nombres a avec des indices $a_{ij}$. Les indices $i$ et $j$ représentent respectivement les lignes et colonnes du nombre $a$.

Si je parle de $a_{23}$ je parle du nombre se trouvant dans la ligne 2 et colonne 3 de la matrice $C$.

Cette fois-ci, le nombre de colonnes et lignes comptent (on ne peut pas changer comme on le voulait pour les vecteur de colonne à ligne...)

Maintenant, passons aux opérations:

### Opération

#### Addition de matrice

$$
A = \begin{bmatrix}
a && b \\
c && d \\
\end{bmatrix}
B = \begin{bmatrix}
w && x \\
y && z \\
\end{bmatrix} \\
A+B = \begin{bmatrix}
a+w && b+x \\
c+y && d+z \\
\end{bmatrix}

$$

Attention, il faut que les deux matrices soient de la même taille pour pouvoir les additionner. Sinon c'est impossible !

#### Multiplication par un scalaire

$$
A =  \begin{bmatrix}
a && b \\
c && d \\
\end{bmatrix} et\  \lambda \in \R \\
\lambda.A = \begin{bmatrix}
\lambda a && \lambda b \\
\lambda c && \lambda d \\
\end{bmatrix}
$$

#### Soustraction

$$
A - B = A + (-B)

$$

Il suffit d'utiliser les deux propriétés précédentes pour vous rendre compte que c'est une multiplication par un scalaire (-1) et une addition.

#### Transposition

$$
A = \begin{bmatrix}
a && b \\
c && d \\
\end{bmatrix} \ A^T = \begin{bmatrix}
a && c \\
b && d \\
\end{bmatrix}
$$

Simplement: les lignes devienent les colonnes et les colonnes, les lignes.

#### Multiplication

C'est le point le plus important ici !!!!

<img src="https://community.arm.com/resized-image/__size/1040x780/__key/communityserver-blogs-components-weblogfiles/00-00-00-21-42/4010.Picture2.jpg" title="" alt="Part 3: Matrix-matrix multiplication. Neon, SVE, and SME compared -  Architectures and Processors blog - Arm Community blogs - Arm Community" data-align="center">

Ici c'est le produit $AB$. Mais ce n'est pas le même pour $BA$. La multiplication n'est pas commutative. Elle est cependant associative: $C(AB) = (CB)A$ et distributive $C(A+B)=CA+CB$. Mais il faut cependant que les matrices que l'on multiplie soient de la bonne taille.

Qu'est-ce que j'entends par bonne taille ?

Il faut que le nombre de lignes de la première matrice soit égale au nombre de colonnes de la seconde matrice et que le nombre de colonnes de la première matrice soit égale au nombre de lignes de la seconde ! Si cette condition n'est pas respectée, on ne peut pas mutiplier les deux matrices.

Autrement dit:

$$
\R_{m.n}\times\R_{n.m} = OK \\
\R_{m.n}\times\R_{n2.m2} = NON
$$

avec $n\neq n2$ et $m \neq m2$.

C'est vraiment important que vous compreniez cette section. Je sais que tout le monde comprend différement donc je vous met une vidéo qui peut vous aidez si vous avez du mal.

[Multiplying Matrices - YouTube](https://www.youtube.com/watch?v=vzt9c7iWPxs)

## Avant de passer à la suite

### A quoi ça va nous servir ?

Comme je l'ai mentionné, l'intelligence artificielle repose sur énormément de multiplications de matrice entre elles. Par la suite, vous verrez des explications détaillées sur les couches de réseaux de neurones et vous avez probablement vu ce genre de schéma précédemment pour les représenter:

![](file://C:\Users\PC\AppData\Roaming\marktext\images\2024-11-28-10-23-19-image.png?msec=1732810999720)

C'est un bon moyen d'introduire au sujet et les représenter visuellement, mais cela rend souvent les gens confus lorsqu'on leur explique que ce sont simplement des multiplications de matrice en réalité.

Je vous donne un exemple maintenant: Les couches cachées (chaque colonne en bleu), sont en réalité des matrices qui contiennent des poids. Un poids est simplement un nombre réel. Ces poids sont arrangés sous la forme de matrice (matrice de poids). Les connexions reliés avec la couche d'avant correspond à l'entrée de la couche. Quand une couche de neurone travaille, ils se passent en réalité une multiplication matricielle entre le résultat de la couche précédente et la couche actuelle.

![](file://C:\Users\PC\AppData\Roaming\marktext\images\2024-11-28-10-34-57-image.png?msec=1732811697531)Voilà la réalité derrière les maths pour les réseaux de neurones. Ce n'est pas si compliqué en réalité. Bon ce n'est qu'une partie, plus précisément la partie "feedforward" (celle qui produit un résultat) mais nous allons voir dans le cours suivant, les maths servant à entraîner notre model (backpropagation). Car oui en multipliant les matrices, notre réseau de neurones produit une sortie (un mot pour chatgpt, une prédiction pour un bot de trading...) mais le model par défaut fait beaucoup d'erreur et il faut corriger les poids pour que la prédiction soit bonne. :) . C'est la phase d'entraînement.



## Pour aller plus loin:

Ce que je vous ai présenté dans ce cours est plus que suffisant concernant le domaine de l'algèbre linéaire pour une application à l'intelligence artificielle. Comme vous allez le voir, nous n'utiliseront que les multiplications de matrice, leurs additions et quelques petits trucs et astuces supplémentaires que je vous expliquerai lors du cours approprié.

De plus, la notion va changer. Puisque l'on va faire énormément de multiplication de matrices, nous n'allons plus écrire les matrices et vecteurs avec des flèches mais comme des scalaire. Comment les différentier du coup ? Avec le context... Ils porteront toujours les mêmes noms (u, v, w...). C'est une pratique commune en intelligence artificielle puisque nous les utilisont tous le temps avec les même noms.

Si vous souhaitez aller plus loin, je vous invite à commencer par ces ressources. Elles sont complètes ensemble et couvrent une grande partie du domaine. Mais ce n'est pas du tout obligatoire pour la suite.

[Algèbre linéaire — Wikipédia](https://fr.wikipedia.org/wiki/Alg%C3%A8bre_lin%C3%A9aire)

[Matrix (mathematics) - Wikipedia](https://en.wikipedia.org/wiki/Matrix_(mathematics)) 

https://lerasle.perso.math.cnrs.fr/docs/LinearAlgebra.pdfhttps://lerasle.perso.math.cnrs.fr/docs/LinearAlgebra.pdf
