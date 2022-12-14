import { ClassModifier, createClassWithModifiers } from "./create-class-with-modifiers";

/**
 * @example
 * const bem = makeBEM("block");
 *
 * bem() === "block";
 * bem(null, ["hello"]) === "block block--hello";
 *
 * const cls = bem("element",
 *   {
 *     "foo": true,
 *     "bar": false,
 *     "object": {
 *       "someProp": 42
 *     }
 *   },
 *   ["array"]
 * );
 * cls === "block__element block__element--foo block__element--object block__element--array"
 */
export const makeBEM = (blockName: string) => {
  return (elementName?: string | null | 0 | undefined, ...modifierArgs: ClassModifier[]) =>
    elementName
      ? createClassWithModifiers(`${blockName}__${elementName}`, ...modifierArgs)
      : createClassWithModifiers(blockName, ...modifierArgs);
};
