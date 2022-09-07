Feature: Calculator

  Background:
    Given a user opens the app

  Scenario: Default display screen
    Then in the display screen should be show a 0
    And no button should be highlighted
    And all buttons should be enabled except +/- and 0

  Scenario Outline: Clicking non-operators screen buttons
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <Button> button
    Then in the display screen should be show a <resultDisplay>

    Examples:
      | numberOnScreen | Button | resultDisplay |
      | 1              | 0      | 10            |
      | 0              | 1      | 1             |
      | 0              | 2      | 2             |
      | 0              | 3      | 3             |
      | 0              | 4      | 4             |
      | 0              | 5      | 5             |
      | 0              | 6      | 6             |
      | 0              | 7      | 7             |
      | 0              | 8      | 8             |
      | 0              | 9      | 9             |
      | 0              | ,      | 0,            |
      | 1              | C      | 0             |
      | 173            | C      | 0             |
      | 1              | +/-    | -1            |

  Scenario Outline: Clicking operators screen buttons
    When the user press the <button> button
    Then just the operator <button> button should be highlighted

    Examples:
      | button |
      | +      |
      | -      |
      | /      |
      | *      |

  Scenario Outline: Unhighlighting operators screen buttons
    When the user press the <button> button
    Then all the operators buttons should be unhighlighted

    Examples:
      | button |
      | =      |
      | C      |

  Scenario Outline: Pressing non-operators keys
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <Key> key
    Then in the display screen should be show a <resultDisplay>

    Examples:
      | numberOnScreen | Key        | resultDisplay |
      | 1              | 0          | 10            |
      | 0              | 1          | 1             |
      | 0              | 2          | 2             |
      | 0              | 3          | 3             |
      | 0              | 4          | 4             |
      | 0              | 5          | 5             |
      | 0              | 6          | 6             |
      | 0              | 7          | 7             |
      | 0              | 8          | 8             |
      | 0              | 9          | 9             |
      | 0              | ,          | 0,            |
      | 1              | ESC        | 0             |
      | -1             | Left Ctrl  | 1             |
      | -1             | Right Ctrl | 1             |
      | 1              | Right Ctrl | -1            |
      | 1              | Left Ctrl  | -1            |

  Scenario Outline: Pressing operators keys
    When the user press the <Key> key
    Then the <Key> button should be highlighted

    Examples:
      | Key |
      | +   |
      | -   |
      | /   |
      | *   |

  Scenario: Doing an operation with keyboard
    And the user press the 2 key
    And the user press the + key
    And the user press the 3 key
    When the user press the Enter key
    Then in the display screen should be show a 5

  Scenario Outline: Writing numbers
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <Button> button
    Then in the display screen should be show a <resultDisplay>

    Examples:
      | numberOnScreen | Button | resultDisplay |
      | 0              | 0      | 0             |
      | 7              | 0      | 70            |
      | 0              | 1      | 1             |
      | 123            | 4      | 1234          |
      | 1234           | 8      | 12348         |
      | 0              | ,      | 0,            |
      | 1234           | ,      | 1234,         |
      | 1234,          | 1      | 1234,1        |
      | 1234,1         | ,      | 1234,1        |
      | 0              | +/-    | 0             |
      | 0,             | +/-    | 0,            |
      | 13,            | +/-    | -13,          |
      | -13,           | +/-    | 13,           |
      | -0,5           | +/-    | 0,5           |
      | 0,5            | +/-    | -0,5          |
      | 7              | +/-    | -7            |
      | 1234           | +/-    | -1234         |
      | -1234          | +/-    | 1234          |

  Scenario Outline: Writing more than 10 digits
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <Action> button
    Then in the display screen should be show a <resultDisplay>

    Examples:
      | numberOnScreen | Action | resultDisplay |
      | 1234567890     | 7      | 1234567890    |
      | 1234567890     | +/-    | -1234567890   |
      | 1234567890     | ,      | 1234567890    |
      | 123456789      | ,      | 123456789,    |
      | 123456789,     | 5      | 123456789,5   |
      | 123456789,5    | +/-    | -123456789,5  |

  Scenario Outline: Performing two number operations
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <Operator> button
    And the user writes the number: <secondNumber>
    And the user press the = button
    Then in the display screen should be show a <resultDisplay>

    Examples:
      | numberOnScreen | Operator | secondNumber | resultDisplay |
      | 24             | +        | 6            | 30            |
      | 24,2           | +        | 6,4          | 30,6          |
      | 13,14          | +        | 2,781        | 15,921        |
      | 10             | +        | -5           | 5             |
      | -20            | +        | 10           | -10           |
      | 24             | -        | 6            | 18            |
      | 6              | -        | 24           | -18           |
      | 6              | -        | -24          | 30            |
      | 24,2           | -        | 6,4          | 17,8          |
      | 13,14          | -        | 2,781        | 10,359        |
      | 10             | *        | 8            | 80            |
      | 5,2            | *        | 8            | 41,6          |
      | 36,25          | *        | 7,496        | 271,73        |
      | 10             | *        | -8           | -80           |
      | -10            | *        | -8           | 80            |
      | -10            | *        | 8            | -80           |
      | 10             | /        | 2            | 5             |
      | 84             | /        | 4,3          | 19,53488372   |
      | 23,58          | /        | 10,14        | 2,325443787   |
      | 10             | /        | -2           | -5            |
      | -10            | /        | 2            | -5            |
      | -10            | /        | -2           | 5             |

  Scenario Outline: Before clicking the equal button
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <operator> button
    And the user writes the number: <secondNumber>
    Then in the display screen should be show a <resultDisplay>

    Examples:
      | numberOnScreen | operator | secondNumber | resultDisplay |
      | 24             | +        | 6            | 6             |
      | 24,2           | -        | 6,4          | 6,4           |
      | 13,14          | *        | 2,781        | 2,781         |
      | 84             | /        | -4,3         | -4,3          |

  Scenario Outline: Performing two number operations with a result number with more than 10 nondecimal digits
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <operator> button
    And the user writes the number: <secondNumber>
    And the user press the = button
    Then in the display screen should be show a ERROR

    Examples:
      | numberOnScreen | operator | secondNumber |
      | 9999999999     | +        | 1            |
      | -1             | -        | 9999999999   |
      | 9999999999     | *        | 2            |
      | 9999999999     | /        | 0,1          |
