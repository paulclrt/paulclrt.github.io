# Long short term memory - LSTM

Si vous n'avez pas lu mon [article sur les RNN](), vous devez le faire avant de passer aux LSTM. C'est un prérequis puisque dans cet article, je vais aller plus vite et passer sur moins de détails. Mais avoir l'intuition de comprendre comment les RNN simples focntionnent vont vous aider grandement dans la comprhénesion des LSTM qui fonctionnent de façon similaire mais avec beaucoup plus de calculs.

## Pourquoi les LSTM existent ?

Comme expliqué précédement, nous avions le problème du vanishing et exploding gradient avec les RNN classiques. Les LSTM ont un mecanisme qui fait que les gradients ne peuvent plus exploser ou disparaitre. Cela est du au fait que les LSTM ont une porte "d'oubli"/forget gate dans leurs architecture. J'expliquerai plus en détails à quoi sert cette porte dans la partie architecture du LSTM mais il faut comprendre que cette "forget gate" est l'élément qui permet de ne plus avoir ce problème de gradient.

## Architecture interne du LSTM

Commençons par le schéma.

![LSTM Networks  step by step](https://cdn.analyticsvidhya.com/wp-content/uploads/2024/10/image-394.webp)

Ici, le schéma représente une cellule unique d'un LSTM. Vous remarquerez des éléments familier comme l'entrée $x_t$ ainsi que $h_{t-1}$ et la sortie intermediaire $h_t$ ...

Ce qui change, ce sont l'entrée et la sortie supplémentaire ainsi que le calcul à l'interieur du LSTM. On a l'entrée $c_{t-1}$ qui correspond au à l'état de la cellule (cell state). On prend en entrée l'état de la précédente cellule et on calcul le nouveau pour le passer à la cellule suivante. Dans ce schéma, la sortie n'est pas représentée mais c'est le même principe que pour les RNN classiques, on multiplie le $h_t$ par une matrice de poids $W_{hy}$ et on additione des poids $b_y$...

## Les calculs

### Le détail le plus important

Précédement, l'information des cellules de RNN précédentes étaient passé de cellule en cellule via le vecteur $h_t$. Ce vecteur bien que toujours présent, a une nouvelle fonction un peu différente. Son role a tout d'abord été prit par le $c(t)$. Cette nouvelle variable passe de cellule en cellule en étant légèrement modifié à chaque fois. C'est un peu comme un convoyeur qui passe de cellule en cellule et auquel on ajoute un peu ou enlève un peu. De cette façon, l'information passe naturellement de cellule en cellule.

Gardez bien en tête cette histoire de $c(t)$ un convoyeur qui contient les infromations et passe de cellule en cellule. Chaque cellule ajoutant ou enlevant des informations. 

### La porte forget

En ce qui concerne le calcul: il est bien différent. Contrairement à un RNN classique où on mutipliait les $h_t$ et $x_t$ par des matrices de poids... ici on ne fait plus ça. On concate les matrices. Autrement dit, on les colles l'une à l'autre. Voici un example:

$$
\begin{bmatrix}1 & 1 \\ 2 & 2\end{bmatrix} et \begin{bmatrix}3 & 3 \\ 2 & 2\end{bmatrix} \\
=\begin{bmatrix}1 & 1 & 3 & 3\\ 2 & 2 & 2 & 2\end{bmatrix}
$$

On les fait passer dans une nouvelle matrice $W_f$ avant de les faire passer dans la fonction d'activation sigmoid.

![](https://miro.medium.com/v2/resize:fit:1138/1*PJ5atpFStpNWE_XpB4e8qQ.png)

Le circuit représenté en rouge est le calcul que l'on vient de faire. Voici l'équation mathématique:

$$
f_t = \sigma(W_f.[h_{t-1},x_t])
$$

La sortie de la porte forget noté $f_t$ est sond égale au résultat de la fonction sigmoid appliqué au une matrice $W_f$ multiplié à la somme des matrice de poids $W_h$ multiplié au vecteur $h_{t-1}$ et la matrice $W_x$ multiplié à l'entrée $x_t$ plus les bias $b_x$.

Le but de la forget gate est de controller quel informations dans le cell state ($c_{t-1}$) vont être oublié en fonction des informations d'entrée de cette cellule ($x_t$). 

De part la nature de la fonction sigmoid, la sortie est comprise entre 0 et 1. Vous remarquerez que l'on fait une multiplication élément par élément des deux matrices (comme pour les CNN avec les kernels et filtres...). Si la sortie est proche de 1, cela implique que l'information doit être gardé, si elle est proche de 0, elle doit être oublié. Donc le convoyeur oublie de l'information ou en gagne de par cette multiplication entre la sortie de la sigmoid et le convoyeur.

### L'input gate

![](https://miro.medium.com/v2/resize:fit:1116/1*pAzAFns1ccuHmBvCqwh3Fg.png)

Pour l'input gate, on fait les mêmes calculs que précedement avec les $h_{t-1}$ et $x_t$. On prend ensuite ces résultats et on les mulitplie par deux matrices différentes $W_c$ et $W_i$ avant de faire passer le résultat dans deux fonctions d'activation différentes et multipliant le résultat. Un peu plus long comme calcul mais voici la formule:

$$
i_o(t) =   \sigma(W_i.[h_{t-1},x_t]) \otimes \tanh(W_c.[h_{t-1},x_t])
$$

Le symbole $\otimes$ indique une multiplication élément par élément des deux matrices. Pour rappel la multiplication élément par élément d'une matrice ressemble à ça:

$$
{\displaystyle {\begin{bmatrix}2&3&1\\0&8&-2\end{bmatrix}}\circ {\begin{bmatrix}3&1&4\\7&9&5\end{bmatrix}}={\begin{bmatrix}2\times 3&3\times 1&1\times 4\\0\times 7&8\times 9&-2\times 5\end{bmatrix}}={\begin{bmatrix}6&3&4\\0&72&-10\end{bmatrix}}}
$$

Le but de la input gate est de controler les nouvelles informations qui  vont être encodé dans le cell state en foncton des données en entré ($x_t$).

Tout comme pour la forget gate, on a une opération entre le convoyeur et la input gate. Cette fois ci, c'est une addition dénoté par le oplus $\oplus$. La multiplication de tanh et sigmoid nous donne une matrice que l'on va ajouter au convoyeur. On ne peux pas  enlever des informations en multipliant par 0.000...1 comme pour la forget gate. La forget gate pour le coup ne peux pas ajouter des données. Une multiplication par 1 donne toujours $x$. Mais une multiplication par quelque chose compris entre 0 et 1 donne toujours une fraction de $x$. 

### L'ouput gate

Le role de la output gate est de controller quels information vont être encodée dans la cell state et envoyé dans les neurones suivants (via $h_t$).

![](https://miro.medium.com/v2/resize:fit:1144/1*wXoU29bsWxi1WQ0DUAnK7g.png)

Le calcul mathématique est le suivant:

$$
o_t = \sigma(W_o . [h_{t-1},x_t])
$$

et 

$$
h_t = o_t \otimes tanh(c_t)
$$

### Le cell state $c(t)$

On a couvert tout le bas du diagrame mais en haut vous remarquerez qu'il y a encore une ligne avec des $\otimes$ et $\oplus$... Avec les calculs précedents, vous avez peut-être déjà compris le calcul mais je vous le met quand même au cas où:

$$
c(t)_1 = f_t\otimes c(t-1) \\
c(t) = i_o(t)\oplus c(t)_1
$$

 Pour rappel, le $\otimes$ est une multiplication élément par élément des deux matrices (pas une multiplication matricielle normale) et le $\oplus$, une simple addition.

## Petit récap intermédiaire

On a 3 gate: forget, input et output.

- La forget sert à determiner quels données venant de la cellule précedente on devrait oublier en fonction de l'entrée actuelle $x(t)$.

- La input sert à savoir quels données de l'entrée de la cellule actuelle garder et graver dans la cell state.

- La output sert à calculer le vecteur hidden state à le passer à la cellule suivante

Le cell state ou convoyeur comme je l'appelle (parceque je trouve ça plus intuitif de se représenter un train passant de cellule en cellule et transportant des informations), sert à passer les informations des cellules précédentes aux cellules suivantes. 

Les fonctions d'activation utilisées sont: *tanh* et *sigmoid*. Voici une petite image avec leurs représentations graphiques:

![Introduction to Different Activation Functions for Deep Learning | by  Shruti Jadon | Medium](https://miro.medium.com/v2/resize:fit:1200/1*ZafDv3VUm60Eh10OeJu1vw.png)

Comprendre que le sigmoid permet d'effectivement se débarasser de certains élements du convoyeur $c_t$ en les multipliants par un nombre compris entre 0 et 1 est essentiel pour comprenre la forget gate.

## La backpropagation

Beaucoup de personnes toruvent la backpropagation pénible et difficile. Je comprend parfaitement cet avis, une fois compris par contre cela ne vous lache pas. Vous comprenderez toujours le principe et saurez l'appliquer à tous les models. 

Si vous êtes encore tous nouveau et pas à entièrement à l'aise avec tous les concepts abordés, ne vous inquietez pas de ne pas savoir précisement toutes les étapes de la backpropagation. Vous pouvez continuer ce cours et le traiter comme une boite noire pour le moment. Quand vous aurez écrit vos premiers models et que  vous serrez plus à l'aise vous pourrez reprendre l'apprentissage ici.

Pour le moment, je vous renvoie vers un autre article qui l'explique très bien: 

https://medium.datadriveninvestor.com/how-do-lstm-networks-solve-the-problem-of-vanishing-gradients-a6784971a577

## Des ressources pour les plus curieux

Backpropagation du RNN et son problème de vanishing gradient: https://medium.datadriveninvestor.com/how-do-lstm-networks-solve-the-problem-of-vanishing-gradients-a6784971a577

Les LSTM en détails (en anglais): [Understanding LSTM Networks -- colah's blog](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
