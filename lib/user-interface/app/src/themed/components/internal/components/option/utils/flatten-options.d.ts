import { DropdownOption, OptionDefinition, OptionGroup } from '../interfaces';
export declare const flattenOptions: (options: ReadonlyArray<OptionDefinition | OptionGroup>) => {
    flatOptions: DropdownOption[];
    parentMap: Map<DropdownOption, DropdownOption>;
};
//# sourceMappingURL=flatten-options.d.ts.map