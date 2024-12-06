# Les gated Reccurent Unit

Le troisème et derneir type de model que l'on va voir ensemble pour les données séquentielles. Je vais passer très vite dessus puisque le principe est très très similaire aux LSTM

## L'architecture

![gated recurrent network](https://cdn.analyticsvidhya.com/wp-content/uploads/2024/10/image-395.webp)

La différence avec les LSTM est que:

- Ils ne contiennent pas de cell state

- Ce sont les hidden state ($h_{t-1}, h_t$) qui transportent l'information

- il y a 2 gates: update et reset

- Ils sont plus rapide que les LSTM (moins d'opérations aussi)

### La update gate

Le but de cette porte est de déterminer 2 choses à la fois: quelles informations oublier et ajouter. Pour le cacul, on retrouve une addition entre le hidden state et input: $x_t\oplus h_{t-1}$ qui est ensuite mis dans la fonction sigmoid: $\sigma(W.x_t\oplus U.h_{t-1})$. Les $W$ et $U$ sont des matrices de poids classiques. Cette sortie est utilisé ensuita dans le calcul de la reset gate mais aussi remuliplié au hidden state. Donc: $h_{t-1} \otimes \sigma(x_t\oplus h_{t-1})$.

### La reset gate

La *reset gate* est conçue pour contrôler combien d’informations provenant du *hidden state* précédent ($h_{t-1}$) doivent être "oubliées" ou réinitialisées. Cela aide à limiter l’impact des gradients explosifs ou évanescents.

Comme pour la *update gate*, le calcul implique une combinaison linéaire suivie d’une activation sigmoïde :

$$
r_t​=σ(W_r​⋅x_t​+U_r​⋅h_{t−1​}+b_r​)
$$

Ensuite, cette valeur $r_t$ est multipliée élément par élément avec $h_{t-1}$, pour "filtrer" les informations passées pertinentes. Le résultat est combiné à l'entrée $x_t$ avant d'être passé dans une fonction $\tanh$ pour générer le *hidden state* actuel :

$$
h_{t2}​=tanh(W⋅x_t​+U⋅(r_t​⊗h_{t−1}​)+b)
$$

Enfin, le nouveau *hidden state* est obtenu en interpolant entre l’ancien $h_{t-1}$ et le candidat $\tilde{h}_t$, selon la valeur de $z_t$ :

$$
h_t​=(1−z_t​)⊗h_{t−1}​+z_t​⊗h_{t2}​
$$

## Principe final

Le GRU fusionne deux mécanismes essentiels : *se souvenir* et *oublier*. Grâce à ses deux portes, il peut décider dynamiquement quelles informations conserver ou négliger à chaque étape temporelle. Cette simplicité relative par rapport aux LSTM, combinée à une efficacité calculatoire, rend les GRU particulièrement utiles pour traiter des données séquentielles lorsque les ressources ou les temps de calcul sont limités.

## Conclusion

Les Gated Recurrent Units sont une version simplifiée mais puissante des LSTM. Leur architecture, basée sur deux portes principales, permet de traiter efficacement des séquences de données tout en réduisant le risque de problèmes liés aux gradients. En raison de leur simplicité et de leur rapidité, ils sont souvent préférés dans des contextes où les performances computationnelles sont critiques. Que ce soit pour des tâches de traitement du langage naturel ou de séries temporelles, les GRU sont un choix robuste et performant.

## Quelques liens supplémentaires pour les curieux:

https://towardsdatascience.com/understanding-gru-networks-2ef37df6c9be

https://ieeexplore.ieee.org/document/9631548

[Human Activity Recognition Method Based on Edge Computing-Assisted and GRU Deep Learning Network](https://www.mdpi.com/2076-3417/13/16/9059)

https://medium.com/@anishnama20/understanding-gated-recurrent-unit-gru-in-deep-learning-2e54923f3e2
