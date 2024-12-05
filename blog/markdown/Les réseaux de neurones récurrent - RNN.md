# Les réseaux de neurones récurrent - RNN

Nous avons vu deux types de réseaux de neurones pour le moment: ANN et CNN. Comme vu précedement, ils ont tous les deux leurs avantages et défauts. Nous n'avons pas encore d'architectures générale résolvant tout les problèmes. 

Un problème que résoudent les RNN est la continuité de la donnée. C'est à dire que si nous prennons un CNN, nous pouvons analyser des images et detecter des objets... mais un CNN classique ne comprend pas les vidéos. Au final, une vidéo n'est qu'une suite d'image. Mais un CNN seul ne peut pas comprendre le lien entre chaque image.

Mais cela aussi pour tout type de données. Un ANN comme nous l'avons vu précédement, peux nous sortir des prédictions, mais il n'y a aucune notion de séquence ou temporalité. C'est là que les RNN entrent en jeux.

## Quels sont les utilisations des RNN ?

Jusqu'à maintenant les RNN ont été souvent utilisé sur des projets demandant l'analyse de séquence de données. Soit:

- Reconnaissance vocale

- Audio, génération de musique...

- Traduction

- Prédiction du prix des actions

- ...

Bien que très peu utlilisé aujourd'hui sous leurs formes simple puisqu'ils comportent des défauts ([vanishing gradient article]()), ils apportent un concept nouveau qui est utilisé dans beaucoup d'architecture nouvelles comme les transformers, l'attention... 

Il est donc essentiel que vous sachiez comment ils fonctionnent avant de juste lire les nouvelles architectures, LSTM, GRU qui les remplacent.

## Le principe

Jusqu'à maintenant, nous fournissions des données au model à un temps t. Un IRM d'un patient, une photo de chat... Et le model nous donnait une sortie simple. Les RNN eux demandent une séquence en entrée et ils peuvent avoir une ou plusieur sortie en fonction de ce que l'on veut faire.

Ils présente aussi de nombreux avantages aux model traditionels:

| Avantage                                                                                                                                                                                                                                                                                    | Inconvéniant                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| - L'entrée peut être de la longueure que l'on veut (elle n'est pas fixé)<br/>- La taille du model n'augmente pas avec une augmentation de l'entrée<br/>- Traitement des données séquentielles<br/>- Partage des poids au court du temps (réduction de la taille mémoire prise par le model) | - Lent à calculer<br/>- Difficulté d'accès à des données très anciennes<br/> |

#### Les types de RNN

<table>
<colgroup><col width="20%">
<col width="55%">
<col width="25%">
</colgroup><tbody>
<tr>
<td align="center"><b>Type of RNN</b></td>
<td align="center"><b>Illustration</b></td>
<td align="center"><b>Example</b></td>
</tr>
<tr>
<td align="center">One-to-one<br><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>x</mi></msub><mo>=</mo><msub><mi>T</mi><mi>y</mi></msub><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">T_x=T_y=1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.969438em; vertical-align: -0.286108em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight" style="margin-right: 0.03588em;">y</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.286108em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">1</span></span></span></span></span></td>
<td align="center"><img class="img-responsive" src="teaching/cs-230/illustrations/rnn-one-to-one-ltr.png?9c8e3b04d222d178d6bee4506cc3f779"></td>
<td align="left">ANN classique (aucune différence)</td>
</tr>
<tr>
<td align="center">One-to-many<br><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>x</mi></msub><mo>=</mo><mn>1</mn><mo separator="true">,</mo><msub><mi>T</mi><mi>y</mi></msub><mo>&gt;</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">T_x=1, T_y&gt;1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.969438em; vertical-align: -0.286108em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.166667em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight" style="margin-right: 0.03588em;">y</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.286108em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">1</span></span></span></span></span></td>
<td align="center"><img class="img-responsive" src="teaching/cs-230/illustrations/rnn-one-to-many-ltr.png?d246c2f0d1e0f43a21a8bd95f579cb3b"></td>
<td align="left">gnération de musique</td>
</tr>
<tr>
<td align="center">Many-to-one<br><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>x</mi></msub><mo>&gt;</mo><mn>1</mn><mo separator="true">,</mo><msub><mi>T</mi><mi>y</mi></msub><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">T_x&gt;1, T_y=1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.969438em; vertical-align: -0.286108em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.166667em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight" style="margin-right: 0.03588em;">y</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.286108em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.64444em; vertical-align: 0em;"></span><span class="mord">1</span></span></span></span></span></td>
<td align="center"><img class="img-responsive" src="teaching/cs-230/illustrations/rnn-many-to-one-ltr.png?c8a442b3ea9f4cb81f929c089b910c9d"></td>
<td align="left">Classification de sentiments</td>
</tr>
<tr>
<td align="center">Many-to-many<br><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>x</mi></msub><mo>=</mo><msub><mi>T</mi><mi>y</mi></msub></mrow><annotation encoding="application/x-tex">T_x=T_y</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.83333em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.969438em; vertical-align: -0.286108em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight" style="margin-right: 0.03588em;">y</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.286108em;"><span class=""></span></span></span></span></span></span></span></span></span></span></td>
<td align="center"><img class="img-responsive" src="teaching/cs-230/illustrations/rnn-many-to-many-same-ltr.png?2790431b32050b34b80011afead1f232"></td>
<td align="left">Name entity recognition</td>
</tr>
<tr>
<td align="center">Many-to-many<br><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>x</mi></msub><mo mathvariant="normal">≠</mo><msub><mi>T</mi><mi>y</mi></msub></mrow><annotation encoding="application/x-tex">T_x\neq T_y</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.88888em; vertical-align: -0.19444em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span><span class="mspace" style="margin-right: 0.277778em;"></span><span class="mrel"><span class="mrel"><span class="mord"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.69444em;"><span class="" style="top: -3em;"><span class="pstrut" style="height: 3em;"></span><span class="rlap"><span class="strut" style="height: 0.88888em; vertical-align: -0.19444em;"></span><span class="inner"><span class="mrel"></span></span><span class="fix"></span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.19444em;"><span class=""></span></span></span></span></span></span><span class="mrel">=</span></span><span class="mspace" style="margin-right: 0.277778em;"></span></span><span class="base"><span class="strut" style="height: 0.969438em; vertical-align: -0.286108em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right: 0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.151392em;"><span class="" style="top: -2.55em; margin-left: -0.13889em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight" style="margin-right: 0.03588em;">y</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height: 0.286108em;"><span class=""></span></span></span></span></span></span></span></span></span></span></td>
<td align="center"><img class="img-responsive" src="teaching/cs-230/illustrations/rnn-many-to-many-different-ltr.png?8ca8bafd1eeac4e8c961d9293858407b"></td>
<td align="left">Traduction</td>
</tr>
</tbody>
</table>

source: [CS 230 - Recurrent Neural Networks Cheatsheet](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks)

## L'interieur d'un RNN

Donc en quoi un RNN diffère-t-il d'un ANN ou CNN ? Un RNN est effectivement un ANN auquel on a rajouté une matrice de poids qui vient du réseaux de neurones précedent.

On représente souvent les RNN à la verticale avec l'entrée X en bas, la sortie Y en haut et une bulle avec une flèche poitant sortant et dirigé vers soit-même h pour *"hidden"*.

Ce h rend souvent les gens confu puisqu'ils se disent qu'il ne s'agit que d'une matrice du style $W_{hidden}$ et donc que c'est un simple ANN a une seul couche avec une flèche étrange pour faire joli.

Mais pas du tout.

Un RNN est en réalité un réseaux de neurone classique auquel on va faire 2 opérations supplémentaires. Le schéma ci dessous aide à voir de quoi sont fait les différents composants du RNN.

![Recurrent Neural Networks](https://cdn.analyticsvidhya.com/wp-content/uploads/2024/09/33870quora.webp)

Vous me direz donc en quoi sont-il spécial ?

D'abord, commençont par déplier l'architecture. Car ce schéma présente le RNN sous sa forme pliée.

![Architecture of (a) Folded RNN, and (b) Unfolded RNN depicts the RNN... |  Download Scientific Diagram](https://www.researchgate.net/publication/378617756/figure/fig1/AS:11431281226695438@1709299678645/Architecture-of-a-Folded-RNN-and-b-Unfolded-RNN-depicts-the-RNN-architecture-where.jpg)

Sur ce schéma, vous pouvez faire à gauche la forme plié et à droite déplié.

Vous remarquerez qu'il s'agit de plusieurs ANN connectés les uns aux autres. Pour être plus précis, ce sont des ANN qui prennent une entrée supplémentaire vennant du model précedent et ont une sortie intermediaire connecté au ANN suivant.
Pour le premier ANN, il s'agit d'un vecteur d'initialisation aléatoire qui sera adapté lors de la backpropagation. Mais pour les éléments suivants, il s'agit d'un calcul à partir de l'entrée précédente. On va le voir plus en détail.

Voici une vision interne d'un ANN pour le RNN:

![Recurrent Neural Networks](https://editor.analyticsvidhya.com/uploads/25904description-block-rnn-ltr.png)

Ca peut paraitre intimidant au premier coup d'oeil mais c'est très simple. Commençons par définir les termes:

- $x^{<t>}$ est la $t$ième entrée. Dans une phrase cela peut être le $t$ième mot...

- $a^{<t-1>}$ est le vecteur d'initialisation caché $t-1$

- $W_{aa}$ est une matrice de poids classique qui sera multilié par le vecteur d'initialisation

-  $W_{ax}$ est une matrice de poids classique qui sera multiplié avec l'entrée $x$

- $b_a$ est une matrice contenant les bias (tout comme un ANN classique)

- $g_1$ fonction d'activation (au choix. souvent *tanh*, *sigmoid*, *relu*...)

Avant de passer au termes suivants, je voudrai prendre 2 secondes pour résumer la première partie du calcul d'un RNN.

Ici nous avons notre vecteur d'initialisation venant du RNN précedent (si premier RNN = random). On le multiplie avec une matrice de poids $W_{aa}$. On fait de même avec notre entrée $x^{<t>}$ et $W_{ax}$ et on additione les poids $b_a$ à ce dernier calcul. On y additionne ensuite le résultat du produit du vecteur d'initialisation et de la matrice de poids $W_{aa}$, et on passe le tout dans la fonction d'activation $g_1$. Ce terme en sortie est le vecteur d'initialisation $a^{<t>}$pour le RNN suivant et le prochain calcul du RNN.

Sous forme d'équation cela donne ceci:

$$
a^{<t>} = g_1(W_{aa}a^{<t-1>} + W_{ax}x^{t} + b_a)
$$

Il nous manque encore la prédiction du RNN ici. C'est la seconde partie du calcul. Voici donc les termes suivants:

- $W_{ya}$ un matrice de poids pour le calcul de la sortie $y$

- $b_y$ un matrice de poids pour la calcul de la sortie $y$

- $g_2$ une deuxième fonction d'activation

Si vous avez compris mon article sur les ANN il n'y a rien de magique ici. C'est une simple multiplication et additon de matrice et un passage dans la fonction d'activation. Donc le calcul est le suivant:

$$
y^{<t>} = g_2(W_{ya}a^{<t>}+b_y)
$$

## Et la backpropagation ?

Souvent la bête noire quand on apprend l'IA et le deep learning, parceque c'est souvent survolé et vu comme une boite noire de "on calcul le gradient et laisse l'ordinateur faire"... Mais c'est essentiel de comprendre le détail pour pouvoir ensuite débugger.



### Le problème du vanishing/exploding gradient

Le problème aussi avec les RNN, c'est que pour le calcul du gradient, celui-ci est souvent soumis à 2 pronlèmes. Le vanishing gradient et exploding gradient. ![Standard RNNs](https://cdn.analyticsvidhya.com/wp-content/uploads/2024/09/image-29.png)

Dans un cas, le gradient devient tellement grand que le model fini par apprendre n'importe comment et faire des prédictions presques aléatoires. Dans l'autre, le gradient devient tellement petit qu'il fini par ne plus apprendre et le model ne s'améliore plus.

Cela vient du fait que le gradient se propage du dernier "RNN" au premier "RNN". Donc à force de passer de RNN en RNN, celui ci devient soit énorme soit minuscule. 

### Des RNNs améliorés: LSTM et GRU

La raison pour laquelle on n'utilise plus des RNN simples est justement à cause de ces histoires de gradient. Pour cela on a trouvé deux solutions principales. Les LSTM (Long Short Term memory) et les GRU (Gated Recurrent Unit).

Ces deux architectures sont donc plus utilisées aujourd'hui et je vais vous les présenter dans les articles suivants :)

Je voudrai aussi vous présenter une autre architecture intéréssante: les Deep RNN. Ce sont des RNN empilé les uns sur les autres comme sur l'image ci dessous:

![10.3. Deep Recurrent Neural Networks — Dive into Deep Learning 1.0.3  documentation](https://d2l.ai/_images/deep-rnn.svg)



Au lieu de prendre la sortie de $H_1^{(1)}$ pour $y_1$, on le refait passer dans un RNN puis un autre... autant de RNN que l'on veut. Je ne présenterai pas cette architecture dans le détail donc je ne fais que la mentionner ici pour que vous en soyez informé et puissiez faire vos propres recherches de votre côté. Ce n'est pas une architecture commune mais elle est sympa à connaitre. Ils sont particulièrement utile pour comprendre la complexité dans de très longues séquences de données.

Et puis encore un petit: les RNN bidirectionels (idem je vous laisse avec une iamge et laisse faire vos recherches si vous voulez vous y interesser.):

![Many to many 2](https://editor.analyticsvidhya.com/uploads/19038bidirec.png)
