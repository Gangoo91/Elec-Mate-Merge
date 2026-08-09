// Calculator Config
export {
  CALCULATOR_CONFIG,
  getCalculatorConfig,
  type CalculatorCategory,
  type CalculatorCategoryConfig,
} from './CalculatorConfig';

// Calculator Card
export {
  CalculatorCard,
  CalculatorSurface,
  CalculatorDivider,
  CalculatorSection,
  CalculatorInputGrid,
} from './CalculatorCard';

// Calculator Input
export { CalculatorInput, CalculatorSelect, CalculatorNumberInput } from './CalculatorInput';

// Calculator Result
export {
  CalculatorResult,
  ResultValue,
  ResultHeadline,
  ResultsGrid,
  ResultDetails,
  ResultBadge,
} from './CalculatorResult';

// Calculator Actions
export { CalculatorActions, CalculateButton, SecondaryButton } from './CalculatorActions';

// Calculator Formula
export { CalculatorFormula, InlineFormula, FormulaReference } from './CalculatorFormula';

// Calculator Editorial (grounded guidance + standards layer)
export { CalculatorEditorial } from './CalculatorEditorial';
export { CalculatorPanes } from './CalculatorPanes';
export {
  CalculatorChart,
  chartTick,
  chartTooltip,
  CHART_AXIS,
  CHART_GRID,
  CHART_VOLT,
  CHART_FAIL,
} from './CalculatorChart';
