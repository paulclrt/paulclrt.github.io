# Comprendre la backpropagation pour l'IA

## Backpropagation en résumé

> La backpropagation est le fait d'actualiser individuellement les poids de chaque couche de neurones (layer) en fonction de l'erreur du model. 

Visuellement voici à quoi cela ressemble:

### Phase feedforward:

Après avoir fait passé nos données une fois dans notre réseaux de neurone, celui-ci nous donne une prediction dans la couche output:

![](C:\Users\PC\AppData\Roaming\marktext\images\2024-11-25-10-00-09-image.png)

### Calculs de l'erreur: loss functions

Nous calculons ensuite l'erreur du model avec la fonction de notre choix. 2 fonctions communes sont par `MAE: Mean absolute error` ou encore `MSE: Mean square error`. Vous pouvez trouver plus d'information sur [les loss functions sur cet article]()

### Ajustement des poids: Backpropagation

![](C:\Users\PC\AppData\Roaming\marktext\images\2024-11-25-10-10-30-image.png)Ceci nous donne une valeurs numérique qui nous permet de determiner à quel point notre model a faux. Si notre model prédit une valeure trop grande par rapport à la réalité, il faut ajuster les poids pour que sa prédiction soit plus petite. S'il prédit une valeur trop petite, il faut ajuster les poids pour qu'elle soit plus grande.

Vous voyez le principe ? **La backpropagation regarde l'erreur du model est ajuste les poids pour s'approcher de la valeure attendue.**

Pour plus de précision et rigueure, la backpropagation n'est que l'algorithme qui calcule le [gradient](). Ce n'est pas la phase feedforward ni l'ajustement des poids (c'est le job de [la descente de gradient]()). Je les ai inclus dans cet article pour donner plus de contexte. Mais le terme backpropagation est souvent utilisé de cette façon. Un ingénieur en intelligence artificielle comprendera parfaitement cette utilisation

### Comment ajuster les poids ?

L'ajustement des poids pour un réseau de neurone est une tâche très mathématique et peu visuelle. Vous pouvez regader l'article que j'ai écrit sur la [descente de gradient soschastique]() ainsi que celui sur la [chain rule](). 

Si vous êtes nouveau sur mon site, je vous invite à aller voir ma page sur [Roadmap IA]() qui regroupe tous mes articles dans l'ordre pour vous facilitez l'apprentissage.

## 
