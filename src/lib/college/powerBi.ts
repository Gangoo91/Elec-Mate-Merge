/**
 * The Power Query (M) the Data and API page gives a college data team
 * (ELE-2057). Web.Contents with a fixed base URL and the RelativePath and
 * Query options is the form Microsoft documents as refreshable in the Power
 * BI service for a web source built in code ("Refresh and dynamic data
 * sources", https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data).
 * It pages on next_offset and builds the table from the documented columns.
 */
import { DATA_API_BASE } from './interchange';

export const POWER_BI_QUERY = `let
    // Your key from Data and API. Make it a Power Query parameter if you prefer.
    ApiKey = "emk_paste_your_key_here",
    Base = "${DATA_API_BASE}",
    GetPage = (dataset as text, offset as number) as record =>
        Json.Document(
            Web.Contents(Base, [
                RelativePath = "v1/" & dataset,
                Query = [limit = "1000", offset = Number.ToText(offset)],
                Headers = [Authorization = "Bearer " & ApiKey]
            ])
        ),
    GetAll = (dataset as text) as table =>
        let
            First = GetPage(dataset, 0),
            Pages = List.Generate(
                () => First,
                (p) => p <> null,
                (p) => if p[next_offset] = null then null else GetPage(dataset, p[next_offset]),
                (p) => p[data]
            ),
            Rows = List.Combine(Pages)
        in
            Table.FromRecords(Rows, First[columns], MissingField.UseNull)
in
    GetAll("learner_progress")`;
