#lang racket

;4.1 shift-left
; Signature: shift-left(lst)
; Type: [list(T) -> list(T)]
; Purpose: gets list as an argument and evaluates the list to shift left by one (place)
(define shift-left (lambda (lst) 
      (if (null? lst)
          '()
          (append (cdr lst)
                  (cons (car lst)
                        '())))
                   ))


;check 4.1 -> shift-left
 ;(printf "start tests for shift-left \n")
 ;(shift-left '())
 ;(shift-left '(5))
 ;(shift-left '(1 2))
 ;(shift-left '(1 2 3 4))
 ;(shift-left '(1 (2 3) 4))




;4.2 shift-k-left 
; Signature: shift-k-left(lst, k)
; Type: [list(T) * number -> list(T)]
; Purpose: gets list and number k, evaluates the list that is the given list's shift left by k steps
(define shift-k-left (lambda (lst k)
        (if (= k 0)
            lst
            (shift-left(shift-k-left lst (- k 1))))
                       ))


;check 4.2 -> shift-k-left
 ;(printf "start tests for shift-k-left\n")
 ;(shift-k-left '() 5)
 ;(shift-k-left '(1) 100)
 ;(shift-k-left '(1 2 3) 0)
 ;(shift-k-left '(1 2 3) 1)
 ;(shift-k-left '(1 2 3) 2)
 ;(shift-k-left '(1 2 3) 3)




;4.3 shift-right
; Signature: shift-right(lst)
; Type: [list(T) -> list(T)]
; Purpose: gets a list and evaluates the list that is the given list's shift right by one step.
(define shift-right(lambda (lst)
     (cond
       ((null? lst) '())
       (else(let ((rev (reverse lst)))
              (cons (car rev) (reverse (cdr rev)))))
                     )))


;check 4.3 -> shift-right
 ;(printf "start tests for shift-right\n")
 ;(shift-right '())
   ;(shift-right '(1))
   ;(shift-right '(1 2 3))
   ;(shift-right '(3 1 2))
  ;(shift-right '(1 2 (3 4)))




;4.4 combine
; Signature:combine(lst1, lst2)
; Type:[list(T) * list(T) -> list(T)]
; Purpose:gets 2 lists and combines them in an alternating manner starting from the first list
;         if one of the lists is empty, then the result of combine is the other list
(define combine (lambda (lst1 lst2)
      (cond
        ((empty? lst1) lst2)
        (else (cons (first lst1) (combine lst2 (rest lst1))))
        )))


;check 4.4 -> combine
 ;(printf "start tests for combine \n")
 ;(combine '() '())
 ;(combine '(1 2 3) '())
 ;(combine '() '(4 5 6))
 ;(combine '(1 3) '(2 4))
 ;(combine '(1 3) '(2 4 5 6))
 ;(combine '(1 2 3 4) '(5 6))




;4.5 sum-tree
; Signature: sum-tree(tree)
; Type: [tree(number) -> number]
; Purpose: computes the sum of numbers present in all tree nodes.
(define sum-tree(lambda(tree)
      (if (empty? tree)
        0
        (if (list? tree)(+(sum-tree (car tree)) (sum-tree (cdr tree)) ) tree)
        )))
                  
          
;check 4.5 -> sum-tree
  ;(printf "start tests for sum-tree \n")
  ;(sum-tree '())
  ;(sum-tree '(1))
  ;(sum-tree '(5 1))
  ;(sum-tree '(5 (1 (2) (3) (6)) (7)))
  ;(sum-tree '(5 (1 (2) (3 (12) (12)) (6)) (7)))




;4.6 inverse-tree
; Signature: inverse-tree(tree)
; Type: [tree(boolean union number) -> tree(boolean union number)]
; Purpose: returns the equivalent tree whose nodes satisfy the following:
;          if the equivalent node of the original tree is a number then the resulting tree's node is -1 * that node value
;          if the equivalent node of the original tree is a boolean then the resulting tree's node is the logical not of that node value
(define inverse-tree(lambda(tree)    
        (if (null? tree)
        '()
        (if (number? (car tree))
            (cons (* -1 (car tree)) (inverse-tree (cdr tree)))
            (if (boolean? (car tree))
                (cons (not (car tree)) (inverse-tree (cdr tree)))
                (cons (inverse-tree (car tree)) (inverse-tree (cdr tree))))))
                      ))


;check 4.6 -> inverse-tree
  ;(printf "start tests for inverse-tree \n")
  ;(inverse-tree '())
  ;(inverse-tree '(5))
  ;(inverse-tree '(0))
  ;(inverse-tree '(#f))
  ;(inverse-tree '(#t))
  ;(inverse-tree '(-5 (1 (-2) (3) (#f)) (#t)))


