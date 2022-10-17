/**
* Definire una istanza di `Eq` per `ReadonlyArray`
* (Define an instance of `Eq` for `ReadonlyArray`)
*/
import { Eq } from 'https://deno.land/x/fp_ts@v2.11.4/Eq.ts'
import * as N from 'https://deno.land/x/fp_ts@v2.11.4/number.ts'


/**
 * Satisfies fp-ts/Eq interface for ReadOnlyArray by defining an Equals function 
 * for a generic ReadOnlyArray, using the generic type's own Eq object.
 *
 * @param E: Generic Eq object
 *
 * @returns Eq<ReadonlyArray<A>>
 * 
*/
export function getEq<A>(E: Eq<A>): Eq<ReadonlyArray<A>> {
    return {
        equals: (first: ReadonlyArray<A>, second: ReadonlyArray<A>) => (    (first.length == second.length) 
                                                                                && first.every(
                                                                                        (x, i) => E.equals(x, second[i])
                                                                                    )
                                                                        )
    }
}

// ------------------------------------
// tests
// ------------------------------------

import {assertStrictEquals} from 'https://deno.land/std@0.159.0/testing/asserts.ts'

const E = getEq(N.Eq)

const as: ReadonlyArray<number> = [1, 2, 3]

Deno.test("getEq test", () => {
    assertStrictEquals(E.equals(as, [1]), false)
    assertStrictEquals(E.equals(as, [1, 2]), false)
    assertStrictEquals(E.equals(as, [1, 2, 3, 4]), false)
    assertStrictEquals(E.equals(as, [1, 2, 3]), true)
});